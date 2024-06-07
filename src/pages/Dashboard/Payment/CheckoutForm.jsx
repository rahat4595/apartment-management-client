import  { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalRentAfterDiscount, setTotalRentAfterDiscount] = useState(0);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [apart] = useCart();
    const navigate = useNavigate();

    const totalRent = apart.reduce((total, item) => total + item.Rent, 0);

    useEffect(() => {
        if (totalRent > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalRentAfterDiscount > 0 ? totalRentAfterDiscount : totalRent })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalRent, totalRentAfterDiscount]);

    const handleApplyCoupon = async () => {
        try {
            const response = await axiosSecure.post('/validate-coupon', { code: couponCode });
            if (response.data.valid) {
                setDiscount(response.data.discount);
                const discountedPrice = totalRent - (totalRent * (response.data.discount / 100));
                setTotalRentAfterDiscount(discountedPrice);

                Swal.fire({
                    icon: 'success',
                    title: 'Coupon applied successfully!',
                    text: `You got ${response.data.discount}% discount`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Coupon',
                    text: 'The coupon code you entered is invalid.',
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // save the payment into database
                const payment = {
                    email: user.email,
                    rent: totalRentAfterDiscount > 0 ? totalRentAfterDiscount : totalRent,
                    transactionId: paymentIntent.id,
                    date: new Date(), // moment js to convert utc data
                    apartId: apart.map(item => item._id),
                    apartItemId: apart.map(item => item.apartmentId),
                    status: 'pending'
                };
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the Payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/history');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {apart.map((item) => (
                <div key={item._id} className="my-5">
                    Total Rent: {item.Rent}$
                </div>
            ))}
            <div className="my-4">
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input input-bordered"
                    placeholder="Enter coupon code"
                />
                <button onClick={handleApplyCoupon}  className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md ml-2 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Apply Coupon</span>
                                </button>
            </div>
            {discount > 0 && (
                <div className="my-4">
                    <p className="text-green-600">Discount Applied: {discount}%</p>
                    <p className="text-green-600">Total Rent after Discount: {totalRentAfterDiscount.toFixed(2)}$</p>
                </div>
            )}
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
