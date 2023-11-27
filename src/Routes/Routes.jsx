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
            element : <CampDetails ></CampDetails>,
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
    path : 'participant-profile',
    
    element : <UserProfile></UserProfile>

  },
  // organizer routes 
  {
    path : 'users',
    element : <AllUsers></AllUsers> 

  }
]

    }
  ]);