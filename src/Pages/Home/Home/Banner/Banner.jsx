import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className="hero min-h-screen bg-red-300">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://i.ibb.co/qssxMkn/3625753.jpg" className="w-1/2 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl text-red-500 font-extrabold hover:underline "> 

            WelCome to CampSwift
            
             </h1>
            <p className="py-6 text-xl text-pink-700 ">Empowering Health Communities - Over 50 Successful Medical Camps Conducted, Bringing Healthcare to Your Doorstep</p>

            <Link to='/signUp'> 
            <button className="btn btn-outline text-center btn-primary">Get Started</button> </Link>
          </div>
        </div>
      </div>
    );
};

export default Banner;