import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/Context";
import useAdmin from "../../../hooks/useAdmin";
import useMember from "../../../hooks/useMember";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isAdmin] = useAdmin();
    const [isMember] = useMember();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                setDropdownVisible(false); // Close the dropdown after logging out
            })
            .catch();
    };

    const links = (
        <>
            <NavLink
                className={({ isActive }) => isActive ? 'text-lg font-semibold text-[#ff5a3c] border px-1 rounded-md border-[#ff5a3c]' : 'text-lg font-semibold'}
                to="/"
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) => isActive ? 'text-lg font-semibold text-[#ff5a3c] border px-1 rounded-md border-[#ff5a3c]' : 'text-lg font-semibold'}
                to="/apartment"
            >
                Apartment
            </NavLink>
        </>
    );

    return (
        <div className="sticky top-0 z-10">
            <div className="navbar mt-4 lg:mt-10 bg-base-100 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <div> <img className="w-[100px] h-[100px] object-contain" src="https://i.ibb.co/ww2q3gf/Blue-Modern-Building-Corp-Logo-removebg-preview.png" alt="" /></div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu flex gap-5 menu-horizontal px-5">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                    {user && (
                        <div className="relative">
                            <img
                                className="btn border-2 rounded-full border-blue-600 p-1"
                                src={user?.photoURL || "https://i.ibb.co/FBZQVTZ/defalt.jpg"}
                                alt="User Profile"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            />
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                                    <div className="px-4 py-2">{user.displayName || 'User'}</div>
                                    {
                                        user && isAdmin && <Link to="/dashboard/adminProfile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Dashboard
                                        </Link>
                                    }
                                    {
                                        user && isMember && !isAdmin && <Link to="/dashboard/apart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Dashboard
                                        </Link>
                                    }
                                     {
                                        user && !isMember && !isAdmin && <Link to="/dashboard/userProfile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Dashboard
                                        </Link>
                                    }

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!user && (
                        <div className="flex gap-4">
                            <Link to="/login">
                                <button className="btn bg-[#ff5a3c] text-white">Login</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
