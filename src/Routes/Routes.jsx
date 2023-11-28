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
            path : 'signUp',

            element : <SignUp></SignUp>
        },
        {
            path : '/camp/camp-details/:id',
            element : <PrivateRoute> <CampDetails ></CampDetails>  </PrivateRoute>,
            loader : ({params}) => fetch(`http://localhost:5000/camp/camp-details/${params.id}`)
        },
        {
            path : '/availableCamps',
            element : <AvailableCamps></AvailableCamps>
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
  // organizer routes 
  {
    path : 'users',
    element : <OrganizerRoute> <AllUsers></AllUsers>  </OrganizerRoute>

  },
  {
    path : 'organizer-profile',
    element : <OrganizerRoute><OrganizerProfile></OrganizerProfile></OrganizerRoute>
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
    element : <OrganizerRoute> <ManageRegCamp></ManageRegCamp> </OrganizerRoute>
  }
 
]

    }
  ]);