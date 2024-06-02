import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UserAnnounce = () => {
    const axiosSecure = useAxiosSecure();
    const {data : announcments = [],} = useQuery({
        queryKey: ['announcment',],
        queryFn: async () =>{
            const res = await axiosSecure.get('/announcment');
            return res.data
        }
    })


    return (
        <div>
            <h2 className="text-4xl">
                All The Announcements are here.: {announcments.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {announcments.map((announcements) => (
                    <div key={announcements._id} className="card bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-2xl font-bold mb-2">{announcements.title}</h3>
                        <p className="text-gray-700">{announcements.announcment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAnnounce;