import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { FaEnvelope } from "react-icons/fa";

const UserProfile = () => {
    const [apart] = useCart();
    const {user} = useAuth();
    return (
        <div>
         
            {apart.map((item) => (

                <div key={item._id} className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-200 text-gray-100">
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                        <img src={item.userImage} alt="" className="object-cover object-center w-full h-full rounded bg-gray-400" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="text-2xl text-black font-semibold">{item.userName}</h2>

                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center space-x-2">
                            <FaEnvelope className="text-gray-700" />
                                <span className="text-black">{item.email}</span>
                            </span>

                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default UserProfile;