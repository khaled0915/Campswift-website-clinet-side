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
                <Link className=" bg-emerald-500 " to='/'>
                    Home </Link>

            </li>
            <li>
                <Link className="bg-green-500" to='/availableCamps'>
                Available Camps


                </Link>

            </li>
            <li>

                
                 <Link className="bg-pink-500" to='/dashboard'>


                 Dashboard 

            </Link> </li>

            <li> 
                
                <Link className="bg-teal-500" to='/contactUs'>

                Contact Us
                
                 </Link>
                 </li>

            

        </>
    return (
        <div className="navbar md:bg-orange-400 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navbarOPtions}
                    </ul>
                </div>


           
                <img className="md:w-[50px]  w-[30px] h-[30px] md:h-[50px]" src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" alt="" />
                <a className="btn btn-ghost text-xm md:text-xl">CampSwift</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navbarOPtions}
                </ul>
            </div>

            {

                user ? 

                <>

<div className="dropdown dropdown-bottom md:dropdown-right dropdown-end">
  <label tabIndex={0} className="btn bg-sky-400 m-1"> 

  <img    className="w-[40px] h-[40px] rounded-full" src={user?.photoURL
} alt="" />
  
   </label>

  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    
    <li>  <button className="btn   btn-accent  " onClick={handleLogOut}>  <span className="text-center my-2"> SignOut  </span>  </button> </li>

  </ul>
</div>

                
             


                
                 </>

                     :

                <>

{/* <img onClick={handleLogOut} className="w-[40px] h-[40px] rounded-full" src={user?.photoURL
} alt="" /> */}

                
                <Link to='/login'> 
            
                <div className="md:navbar-end">
                    <a className="btn btn-xs md:btn-lg"> Login </a>
                </div> </Link>

                 </>
            }
        </div>
    );
};

export default Navbar;