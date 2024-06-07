import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Coupon = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coupons, setCoupons] = useState([]);
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
            const response = await axiosSecure.post('/coupons', data);
            console.log('Coupon added:', response.data);
            setIsModalOpen(false);
            reset();
            fetchCoupons(); // Refresh the coupons list
        } catch (error) {
            console.error('Error adding coupon:', error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl my-4">Coupons List</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id}>
                                <td className="border px-4 py-2">{coupon.code}</td>
                                <td className="border px-4 py-2">{coupon.discount}%</td>
                                <td className="border px-4 py-2">{coupon.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            


            {/* Adding Coupon */}
            <button onClick={() => setIsModalOpen(true)} className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                <span className="absolute inset-0 bg-black transition-all duration-300 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                <span className="relative z-10">Add Coupon</span>
            </button>
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add a new coupon</h3>
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
                                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
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
