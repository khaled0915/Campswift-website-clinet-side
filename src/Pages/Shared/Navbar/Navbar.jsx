import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";


const Navbar = () => {


    const {user , logOut} = useContext(AuthContext);

    const handleLogOut = () =>{

        logOut()
        .then(() =>{})
        .catch( error => console.log(error) )

    }


    const navbarOPtions =
        <>


            <li>
                <Link to='/'>
                    Home </Link>

            </li>
            <li>
                <Link to='/availableCamps'>
                Available Camps


                </Link>

            </li>
            <li>

                
                 <Link to='/dashboard/participant-profile'>


                 Dashboard 

            </Link> </li>

            

        </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navbarOPtions}
                    </ul>
                </div>


           
                <img className="w-[50px] h-[50px]" src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" alt="" />
                <a className="btn btn-ghost text-xl">CampSwift</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navbarOPtions}
                </ul>
            </div>

            {

                user ? 

                <>

<div className="dropdown dropdown-right dropdown-end">
  <label tabIndex={0} className="btn m-1"> 

  <img    className="w-[40px] h-[40px] rounded-full" src={user?.photoURL
} alt="" />
  
   </label>

  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    
    <li>  <button className="btn btn-outline btn-accent  " onClick={handleLogOut}>  <span className="text-center my-2"> SignOut  </span>  </button> </li>

  </ul>
</div>

                
             


                
                 </>

                     :

                <>

{/* <img onClick={handleLogOut} className="w-[40px] h-[40px] rounded-full" src={user?.photoURL
} alt="" /> */}

                
                <Link to='/login'> 
            
                <div className="md:navbar-end">
                    <a className="btn"> Login </a>
                </div> </Link>

                 </>
            }
        </div>
    );
};

export default Navbar;