import { useForm } from 'react-hook-form';
import useCart from '../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { register, handleSubmit } = useForm();
    const [apart] = useCart();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        // Navigate to the checkout component after form submission
        navigate('/dashboard/checkout');
    };

    return (
        <div>
            <h2 className="text-4xl">Payment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {apart.map((item, index) => (
                    <div key={item._id} className="mb-4">
                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register(`email_${index}`)}
                                defaultValue={item.email}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Floor</span>
                            </label>
                            <input
                                type="text"
                                {...register(`FloorNo_${index}`)}
                                defaultValue={item.FloorNo}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Block Name</span>
                            </label>
                            <input
                                type="text"
                                {...register(`BlockName_${index}`)}
                                defaultValue={item.BlockName}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Apartment No</span>
                            </label>
                            <input
                                type="text"
                                {...register(`ApartmentNo_${index}`)}
                                defaultValue={item.ApartmentNo}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Rent ( $ )</span>
                            </label>
                            <input
                                type="text"
                                {...register(`Rent_${index}`)}
                                defaultValue={item.Rent}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 mb-4">
                            <label className="label">
                                <span className="label-text">Month</span>
                            </label>
                            <select
                                {...register(`month_${index}`, { required: true })}
                                required
                                className="input input-bordered w-full">
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                    </div>
                ))}

                <input
                    type="submit"
                    value="Pay"
                    className="bg-black text-white p-4 rounded-xl btn-block cursor-pointer"
                />
            </form>
        </div>
    );
};

export default Payment;
