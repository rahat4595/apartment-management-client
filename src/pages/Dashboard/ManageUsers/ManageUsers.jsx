import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users',],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


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

    const handleMakeUser = user => {
        axiosSecure.patch(`/users/user/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a user Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Manage Members</h2>
                
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Member</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-[#ff5a3c] text-white ">
                                        Make Admin
                                    </button>}
                                </td>
                                <td>
                                    {user.role === 'member' ? 'Member' :
                                        <button
                                            onClick={() => handleMakeMember(user)}
                                            className="btn bg-[#ff5a3c] text-white ">Make Member</button>}
                                </td>
                                <td>
                                    {user.role === ' ' ? 'User' :
                                        <button
                                            onClick={() => handleMakeUser(user)}
                                            className="btn">
                                            Remove
                                        </button>

                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;