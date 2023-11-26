import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const Login = () => {



    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event =>{
        event.preventDefault();
        const form  = event.target;
        
        const email = form.email.value ;

        const password = form.password.value ; 

        console.log(email , password);

        signIn(email , password)
        .then(result =>{
            const user = result.user ;
            console.log(user);

            Swal.fire({
                title: "user login successfully",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });

              navigate(from , {replace : true})





            
        })
    }
    return (


        <div>

            <Helmet>
                <title> CampSwift | Login  </title>

            </Helmet>



           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col md:flex-row-reverse">
    <div className="text-center w-auto lg:text-left">
    <h1 className="text-5xl my-7 underline font-bold">Login now!</h1>
    
        <img className="w-[400px] h-[300px]" src="https://i.ibb.co/xzv4tj4/3094352.jpg" alt="" />
    
     
    </div>
    <div className="card md:w-3/4 max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">

          

          <input type="submit" value='Login' className="btn btn-secondary btn-outline" />
        </div>
      </form>

      <p className="my-5 p-4" > New Here ? 
 
        <Link className="text-xl p-5 text-orange-600 font-bold hover:underline" to='/SignUp'> 
        Sign UP
         </Link>
        
        
         </p>

         <SocialLogin></SocialLogin>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;