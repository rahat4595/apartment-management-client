import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Apartment from "../pages/Apartment/Apartment";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import PrivateRoute from  "../Routes/PrivateRoute"
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import MemberRoute from "./MemberRoute";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import MakeAnnounc from "../pages/Dashboard/MakeAnnounc/MakeAnnounc";
import Announcements from "../pages/Dashboard/Announcements/Announcements";
import UserAnnounce from "../pages/Dashboard/UserAnnounce/UserAnnounce";
import Requests from "../pages/Dashboard/Requests/Requests";
import Payment from "../pages/Dashboard/Payment/Payment";

import CheckoutPage from "../pages/Dashboard/Payment/CheckoutPage";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signin',
            element:<SignUp></SignUp>
        },
        {
          path:'/apartment',
          element:<Apartment></Apartment>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // members Routes
        {
          path:'apart',
          element:<Profile></Profile>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        {
          path:'checkout',
          element:<CheckoutPage></CheckoutPage>
        },
        {
          path:'announcement',
          element:<MemberRoute><Announcements></Announcements></MemberRoute>
        },
        // admins routes
        {
          path:'adminProfile',
          element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path:'members',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'makeAnnoc',
          element:<AdminRoute><MakeAnnounc></MakeAnnounc></AdminRoute>
        },
        {
          path:'reqts',
          element:<Requests></Requests>
        },
        // user routes
        {
          path:'userProfile',
          element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>
        },
        {
          path:'userAnnouc',
          element:<UserAnnounce></UserAnnounce>
        }
        
      ]
    }
  ]);