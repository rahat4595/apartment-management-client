import { useState, useContext } from "react";
import useApart from "../../hooks/useApart";
import { AuthContext } from "../../providers/Context";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import 'animate.css';

const Apartment = () => {
    const [apartments] = useApart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const reqDate = new Date().toISOString().slice(0, 10);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;


    const handleAgreement = async (aggrement) => {
        if (user && user.email) {
            try {
                const response = await axiosSecure.get('/aparts/email', {
                    params: { email: user.email }
                });

                if (response.data.length > 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Agreement Exists",
                        text: "You already have an agreement for an apartment.",
                    });
                    return;
                }

                const cartItem = {
                    apartmentId: aggrement._id,
                    email: user.email,
                    userName: user.displayName,
                    userImage: user.photoURL,
                    photo: aggrement.apartmentImage,
                    FloorNo: aggrement.floorNo,
                    BlockName: aggrement.blockName,
                    ApartmentNo: aggrement.apartmentNo,
                    Rent: aggrement.rent,
                    status: "Pending",
                    reqDate
                };

                const res = await axiosSecure.post('/aparts', cartItem);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Apartment added`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Agreement Exists",
                        text: error.response.data.message,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Could not add apartment to cart",
                    });
                }
            }
        } else {
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
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const totalPages = Math.ceil(apartments.length / itemsPerPage);

    const currentApartments = apartments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Available Apartments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__zoomIn">
                {currentApartments.map((apartment) => (
                    <div key={apartment._id} className="card w-full bg-base-100 shadow-xl">
                        <figure><img className="duration-300 hover:scale-105" src={apartment.apartmentImage} alt="Apartment" /></figure>
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
                                <button onClick={() => handleAgreement(apartment)} className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-300 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Agreement</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 border rounded ${
                            currentPage === index + 1 ? "bg-gray-700 text-white" : "bg-white text-gray-700"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Apartment;
