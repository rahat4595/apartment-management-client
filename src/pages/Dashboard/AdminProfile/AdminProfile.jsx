import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEnvelope, FaUser, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const totalRooms = stats.totalRooms || 0;
    const availableRooms = stats.availableRooms || 0;
    const unavailableRooms = stats.unavailableRooms || 0;


    const availablePercentage = totalRooms ? ((availableRooms / totalRooms) * 100).toFixed(2) : 0;
    const unavailablePercentage = totalRooms ? ((unavailableRooms / totalRooms) * 100).toFixed(2) : 0;

    const roomData = [
        { name: 'Available Rooms', value: availableRooms },
        { name: 'Unavailable Rooms', value: unavailableRooms }
    ];

    const COLORS = ['#0088FE', '#FFBB28'];

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>

            <div className="flex gap-5 mt-5 flex-col lg:flex-row ">
            <div  className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-200 text-gray-100">
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                        <img src={user.photoURL} alt="" className="object-cover object-center w-full h-full rounded bg-gray-400" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="text-2xl text-black font-semibold">{user.displayName}</h2>

                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center space-x-2">
                            <FaEnvelope className="text-gray-700" />
                                <span className="text-black">{user.email}</span>
                            </span>

                        </div>
                        <div>
                            <p className="text-black">Admins Info </p>
                        </div>
                    </div>
                </div>

            <div className="stats shadow mt-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-3xl" />
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">Total registered users</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"/>
                    </div>
                    <div className="stat-title">Members</div>
                    <div className="stat-value">{stats.members}</div>
                    <div className="stat-desc">Total registered members</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"/>
                    </div>
                    <div className="stat-title">Rooms</div>
                    <div className="stat-value">{stats.totalRooms}</div>
                    <div className="stat-desc">Total Number of Rooms</div>
                </div>
            </div>

            </div>

            <div className="mt-8">
                <h3 className="text-xl">Room Availability</h3>
                <PieChart width={400} height={300}>
                    <Pie
                        data={roomData}
                        cx={200}
                        cy={150}
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {roomData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            <div className="text-center mt-4">
                    <p className="text-lg">Available Rooms: {availablePercentage}%</p>
                    <p className="text-lg">Unavailable Rooms: {unavailablePercentage}%</p>
                </div>
        </div>
    );
};

export default AdminProfile;
