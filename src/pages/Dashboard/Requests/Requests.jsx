import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/Context";
import Swal from "sweetalert2";

const Requests = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const acceptDate = new Date().toISOString().slice(0, 10);

    const { data: request = [], refetch } = useQuery({
        queryKey: ['aparts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/aparts');
            return res.data;
        }
    });

    const handleMakeMember = user => {
        axiosSecure.patch(`/users/member/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a Member Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleAccept = async (item) => {
        if (user && user.email) {
            try {
                const res = await axiosSecure.put(`/aparts/${item._id}`, {
                    status: "Checked",
                    acceptDate: acceptDate,
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Agreement accepted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            } catch (error) {
                console.error("Error accepting agreement:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Failed to accept agreement`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };


    return (
        <div>
            <div><h2>Agreement Requests: {request.length}</h2></div>
            <div className="md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {request.map((item) => (
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
                            <div className="flex gap-5">
                                <button onClick={() => handleAccept(item)} className="text-xl font-semibold px-5 py-2 bg-[#23BE0A] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Accept</span>
                                </button>
                                <button className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
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








//  // Get all apartments
//  app.get('/aparts', async (req, res) => {
//     const result = await apartmentCollection.find().toArray();
//     res.send(result);
//   });


//   // Update the status of an agreement
//   app.put('/aparts/:id', async (req, res) => {
//     const id = req.params.id;
//     const { status, acceptDate } = req.body;

//     const filter = { _id: new ObjectId(id) };
//     const updateDoc = {
//       $set: {
//         status: status,
//         acceptDate: acceptDate,
//       },
//     };

//     const result = await apartmentCollection.updateOne(filter, updateDoc);
//     res.send(result);
//   });













