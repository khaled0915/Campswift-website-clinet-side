import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const SignUp = () => {

  const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const {createUser , updateUserProfile} = useContext(AuthContext);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) =>  {


        
        console.log(data)


        createUser(data.email , data.password)
        .then(result =>{
            const loggedUser = result.user ;
            console.log(loggedUser);
            updateUserProfile(data.name , data.photoURL)
            .then(() =>{

              const userInfo = {
                name : data.name ,
                email : data.email ,

                role : data.role 
                
              }

              // create user entry in the database

              axiosPublic.post('/users' , userInfo)
              .then(res =>{
                if(res.data.insertedId){

                  console.log('user added in the db');


                  reset();
                  // Swal.fire({
                  //     position: "top-end",
                  //     icon: "success",
                  //     title: "user created successfully",
                  //     showConfirmButton: false,
                  //     timer: 1500
                  //   });

                    // navigate('/')

                    if(data.role === 'Organizer'){
                      navigate('//dashboard/organizer-profile')
                    }
                    else if(data.role === 'Participant')
                     {
                      navigate('/dashboard/participant-profile')

                    }
                    else {
                      navigate('/');
                    }
                  
                }
              })


                // console.log('user profile updated');
               

            })
            .catch(error => console.log(error))

            
            

        })
    
    }


    



    

    
    return (


        <div>


        <Helmet>
                        <title> CampSwift | sign Up </title>
        
                    </Helmet>
        
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left px-5">
              <h1 className="text-5xl my-6 underline font-bold"> Sign Up now!</h1>

              <img className="w-[500px] h-[400px]" src="https://i.ibb.co/mFZp7zH/6368592.jpg" alt="" />

            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" {...register("name" , { required: true})} placeholder="Your Name" name='name' className="input input-bordered" required />
        
                  {errors.name && <span className="text-red-500">This field is required</span>}
                </div>


                <select name='role' {...register("role" , { required: true})} className="select select-accent w-full max-w-xs">
  <option disabled selected> Your Role </option>
  <option> Participant </option>
  <option> Organizer </option>
  <option> Health Care Professional </option>
</select>




                


                <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" {...register("photoURL" , { required: true})} placeholder="Photo uRl"  className="input input-bordered" required />

          {errors.photoURL && <span className="text-red-500">photo url  is required</span>}
        </div>
               
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" {...register("email" , { required: true} )} placeholder="email" name='email' className="input input-bordered" required />
        
                  {errors.email && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" {...register("password" , { required: true, minLength :6 , 
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ ,
                     maxLength: 20 } )} placeholder="password" name='password' className="input input-bordered" required />
                  {errors.password?.type==='required' && <p className="text-red-600"> 
                    Password is required</p>}
        
                  {errors.password?.type === "minLength" && (
                <p className=" text-red-600"> password  must be 6 characters </p>
              )}
                  {errors.password?.type === "maxLength" && (
                <p className=" text-red-600"> password  must be less than 20 characters </p>
              )}
                  {errors.password?.type === "pattern" && (
                <p className=" text-red-600"> password  must be  have one uppercase , one lower case,one number and one special characters </p>
              )}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                 
        
                  <input 
                  className="btn btn-outline"
        
                   
                   type="submit"
                    value='Sign up' />
        
        
                </div>
              </form>


              
        
              <p className="px-6"> <small> Already have an account ? <Link className="text-xl p-4 text-green-600 font-extrabold hover:underline " to='/login'> Login </Link> </small> </p>

              <p className="mt-5 p-5 text-center font-extrabold bg-cyan-500 "> Or Sign Up with Google  </p>

              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
                    
                </div>
    );
};

export default SignUp;