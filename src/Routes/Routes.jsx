import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CampDetails from "../Pages/CampDetails/CampDetails";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
        }
      ]
    },
  ]);