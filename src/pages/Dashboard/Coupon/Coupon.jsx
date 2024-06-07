import  { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Coupon = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axiosSecure.get('/coupons');
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (currentCoupon) {
                await axiosSecure.put(`/coupons/${currentCoupon._id}`, data);
                setIsUpdateModalOpen(false);
                setCurrentCoupon(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Coupon updated',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                await axiosSecure.post('/coupons', data);
                setIsModalOpen(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Coupon added',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            reset();
            fetchCoupons();
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
    };

    const openUpdateModal = (coupon) => {
        setCurrentCoupon(coupon);
        setValue('code', coupon.code);
        setValue('discount', coupon.discount);
        setValue('description', coupon.description);
        setIsUpdateModalOpen(true);
    };

    return (
        <div>
            <h2 className="text-3xl my-4">Coupons List</h2>
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Description</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon, index) => (
                            <tr key={coupon._id} className="bg-base-200 text-xl">
                                <th className="border px-4 py-2">{index + 1}</th>
                                <td className="border px-4 py-2">{coupon.code}</td>
                                <td className="border px-4 py-2">{coupon.discount}%</td>
                                <td className="border px-4 py-2">{coupon.description}</td>
                                <td
                                    className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => openUpdateModal(coupon)}
                                >
                                    Update
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                <span className="absolute inset-0 bg-black transition-all duration-300 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                <span className="relative z-10">Add Coupon</span>
            </button>

            {(isModalOpen || isUpdateModalOpen) && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{currentCoupon ? 'Update Coupon' : 'Add a new coupon'}</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Coupon Code</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('code', { required: true })}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Discount Percentage</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('discount', { required: true })}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    {...register('description', { required: true })}
                                    className="textarea textarea-bordered"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => { setIsModalOpen(false); setIsUpdateModalOpen(false); setCurrentCoupon(null); reset(); }}>Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coupon;
