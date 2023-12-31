import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CampDetails from "../Pages/CampDetails/CampDetails";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddCamp from "../Pages/Dashboard/AddCamp/AddCamp";
import OrganizerRoute from "./OrganizerRoute";
import ManageCamp from "../Pages/Dashboard/ManageCamp/ManageCamp";
import ManageRegCamp from "../Pages/Dashboard/ManageRegCamp/ManageRegCamp";
import RegisteredCamp from "../Pages/Dashboard/RegisteredCamp/RegisteredCamp";
import OrganizerProfile from "../Pages/Dashboard/OrganizerProfile/OrganizerProfile";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UpdateCampInfo from "../Pages/Dashboard/UpdateCampInfo/UpdateCampInfo";
import ContactUs from "../Pages/ContactUs/ContactUs";




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage> ,
      children : [
        {
            path : '/' ,
            element : <Home></Home>
           
        },
        {
            path : 'login',
            element : <Login> </Login>
        },
        {

          path : '/contactUs' ,
          element : <ContactUs></ContactUs>

        },
        {
            path : 'signUp',

            element : <SignUp></SignUp>
        },
        {
            path : '/camps/camp-details/:id',
            element : <PrivateRoute> <CampDetails ></CampDetails> </PrivateRoute>,
            loader : ({params}) => fetch(`https://medical-camp-management-server.vercel.app/camps/camp-details/${params.id}`)
        },
        {
            path : '/availableCamps',
            element : <PrivateRoute> <AvailableCamps></AvailableCamps> </PrivateRoute>
        }
      ]
    },


    {
path : 'dashboard',
element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
errorElement : <ErrorPage></ErrorPage>,
children : [
  {
    // participant
    path : 'participant-profile',
    
    element : <UserProfile></UserProfile>

  },
  {
    path : 'registered-camps',
    element : <RegisteredCamp></RegisteredCamp>
  },

  {
    path : 'payment',
    element : <Payment></Payment>
  },



  // organizer routes 
  {
    path : 'users',
    element : <OrganizerRoute> <AllUsers></AllUsers>  </OrganizerRoute>

  },
  {
    path : 'organizer-profile',
    element : <OrganizerRoute><OrganizerProfile></OrganizerProfile></OrganizerRoute>
    // loader : ({params}) => fetch(`https://medical-camp-management-server.vercel.app/users/${params.id}`)
  },
  {
    path : 'add-a-camp',
    element : <OrganizerRoute> <AddCamp></AddCamp> </OrganizerRoute> 
  },
  {
    path : 'manage-camps' ,
    element : <OrganizerRoute> <ManageCamp></ManageCamp> </OrganizerRoute>
     
  },
  {
    path : 'manage-registered-camps' ,
    element : <OrganizerRoute> <ManageRegCamp></ManageRegCamp> </OrganizerRoute>,
    loader : () =>fetch('https://medical-camp-management-server.vercel.app/all')
  },
  {
    path : 'update-camp-info/:id',
    element : <OrganizerRoute> <UpdateCampInfo></UpdateCampInfo> </OrganizerRoute>,
    loader : ({params}) => fetch(`https://medical-camp-management-server.vercel.app/camps/${params.id}`)
  }
 
]

    }
  ]);