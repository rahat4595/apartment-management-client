import { useContext } from "react";
import useApart from "../../hooks/useApart";
import { AuthContext } from "../../providers/Context";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const Apartment = () => {
    const apartments = useApart();
    const {user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const handleAgreement = aggrement =>{
       if(user && user.email){
        console.log(user.email , aggrement.blockName)
        const cartItem = {
            apartmentId: aggrement._id,
            email: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            FloorNo:aggrement.floorNo,
            BlockName:aggrement.blockName,
            ApartmentNo: aggrement.apartmentNo,
            Rent:aggrement.rent,
            status:"Pending"

        }
        axiosSecure.post('/carts', cartItem)
        .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Aoartment added`,
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
        })
        
       }
       else{
        {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
       }
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Available Apartments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                    <div key={apartment._id} className="card w-full bg-base-100 shadow-xl">
                        <div className="card w-full bg-base-100 shadow-xl">
                            <figure><img className="duration-300 hover:scale-105" src={apartment.apartmentImage} alt="Shoes" /></figure>
                            <div className="card-body">


                                <div className="flex">
                                    <p>Floor No. {apartment.floorNo}</p>
                                    <p className="flex gap-2">Block Name: {apartment.blockName} </p>
                                </div>

                                <div className="flex">
                                    <p>Rent: ${apartment.rent}</p>
                                    <p className="flex gap-2">Apartment No. {apartment.apartmentNo} </p>
                                </div>
                                <div className="card-actions justify-start">

                                    <button onClick={() => handleAgreement(apartment)} className="text-xl font-semibold px-5 py-2  bg-[#23BE0A] text-white rounded-md mt-10 relative overflow-hidden group">
                                        <span className="absolute inset-0 bg-black transition-all duration-300 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                        <span className="relative z-10">Agreement</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Apartment;
