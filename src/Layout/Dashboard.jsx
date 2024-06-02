import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useMember from "../hooks/useMember";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isMember] = useMember();
    
    return (
        

        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                   {
                    isAdmin ? <>
                    <li><NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink></li>
                    <li><NavLink to='/dashboard/members'>Manage Members</NavLink></li>
                    <li><NavLink to='/dashboard/makeAnnoc'>Make Announcements</NavLink></li>
                    <li><NavLink to='/dashboard/reqts'>Agreement Requests</NavLink></li>
                    <li><NavLink to='/dashboard/coupons'>Manage Coupons</NavLink></li>
                    </>
                    :
                    isMember ?
                    <>
                     <li><NavLink to='/dashboard/apart'>My Profile</NavLink></li>
                    <li><NavLink to='/dashboard/payment'>Make Payment</NavLink></li>
                    <li><NavLink to='/dashboard/history'>Payment History</NavLink></li>
                    <li><NavLink to='/dashboard/announcement'>Announcements</NavLink></li>
                    </>
                    :
                    <>
                    <li><NavLink to='/dashboard/userProfile'>My Profile</NavLink></li>
                    <li><NavLink to='/dashboard/userAnnouc'>Announcements</NavLink></li>
                    </>
                   }


                    {/* shared navs links*/}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/apartment">
                            <FaSearch></FaSearch>
                            Apartment</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;