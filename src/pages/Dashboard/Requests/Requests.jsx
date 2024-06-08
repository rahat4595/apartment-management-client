import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/Context";
import Swal from "sweetalert2";

const Requests = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [requestList, setRequestList] = useState([]);

    const { data: request = [], refetch } = useQuery({
        queryKey: ['aparts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/aparts');
            setRequestList(res.data); // Set initial request list state
            return res.data;
        }
    });

    const handleAccept = async (item) => {
        if (user && user.email) {
            try {
                const updateData = {
                    apartId: item._id, // Passing the apartment ID
                    userEmail: item.email, // Passing the user email
                };
                const res = await axiosSecure.put(`/updateStatusAndRole`, updateData);
                if (res.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Agreement accepted and user role updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Remove the accepted item from the request list
                    setRequestList(prev => prev.filter(req => req._id !== item._id));
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: `Agreement accepted but failed to update user role`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error("Error accepting agreement:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Agreement accepted but the user is already a member`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    };

    const handleReject = async (item) => {
        if (user && user.email) {
            try {
                const res = await axiosSecure.put(`/aparts/${item._id}`, {
                    status: "Checked",
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Agreement rejected`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Remove the rejected item from the request list
                    setRequestList(prev => prev.filter(req => req._id !== item._id));
                }
            } catch (error) {
                console.error("Error rejecting agreement:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Failed to reject agreement`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div>
            <div><h2>Agreement Requests: {requestList.length}</h2></div>
            <div className="md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {requestList.map((item) => (
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
                                <h2 className="text-gray-800 font-semibold">Apartment No: {item.ApartmentNo}</h2>
                            </div>
                            <div className="flex justify-between mb-4">
                                <p className="text-gray-800 font-semibold flex gap-3">Floor No. {item.FloorNo}</p>
                                <span className="text-gray-800 font-semibold">Rent: ${item.Rent}</span>
                            </div>
                            <p className="text-gray-800 font-semibold flex gap-3">Request Date: {item.reqDate}</p>
                            <p className="text-gray-800 font-semibold flex gap-3"> {item.status}</p>
                            <div className="flex gap-5">
                                <button onClick={() => handleAccept(item)} className="text-xl font-semibold px-5 py-2 bg-[#23BE0A] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Accept</span>
                                </button>
                                <button onClick={() => handleReject(item)} className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;
