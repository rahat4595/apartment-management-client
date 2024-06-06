import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaUsers } from "react-icons/fa";

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

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>

            <div className="stats shadow mt-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser />
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">Total registered users</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers />
                    </div>
                    <div className="stat-title">Members</div>
                    <div className="stat-value">{stats.members}</div>
                    <div className="stat-desc">Total registered members</div>
                </div>

                
            </div>
        </div>
    );
};

export default AdminProfile;
