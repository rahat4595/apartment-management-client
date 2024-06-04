import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    </div>
    );
};

export default CheckoutPage;
