import { MdOutlineLocationOn } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import { GrNotes } from "react-icons/gr";

const Profile = () => {
    const [apart] = useCart();
    return (
        <div>
            <h2 className="text-6xl">Apartment Count: {apart.length}</h2>
            <div className=" md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {apart.map((item) => (
                <div key={item._id} className="card w-full bg-base-100 shadow-xl mb-4">
                    <figure>
                        <img className="duration-300 hover:scale-105" src={item.photo} alt="Apartment" />
                    </figure>
                    <div className="card-body">
                        <div className="flex items-center mb-2">
                            <img src={item.userImage} alt="" className="w-10 h-10 rounded-full mr-2" />
                            <p className="text-gray-800 font-semibold">{item.userName}</p>
                        </div>
                        <div>
                        <p className="text-gray-800 font-semibold">Email: {item.email}</p>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-xl font-bold text-gray-800">{item.BlockName}</h2>
                            <span className='px-2 py-1 rounded-full bg-[#ff5a3c] text-white text-sm font-semibold'>{item.status}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-800 font-semibold">Apartment No: {item.ApartmentNo}</p>
                            <span className="text-gray-800 font-semibold">Rent: ${item.Rent}</span>
                        </div>
                        <p className="text-gray-800 font-semibold flex gap-3"><MdOutlineLocationOn className="mt-1" /> {item.acceptDate}</p>
                        <p className="text-gray-800 font-semibold flex gap-3"><GrNotes className="mt-1" /> {item.FloorNo}</p>

                        <button  className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Make Payment</span>
                                </button>
                    </div>

                    
                </div>
            ))}
            </div>
        </div>
    );
};

export default Profile;
