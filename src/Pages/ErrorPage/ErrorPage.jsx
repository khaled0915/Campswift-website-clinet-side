import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (


<div className="flex flex-col bg-red-500 items-center justify-center h-screen">
      <img src="https://i.ibb.co/qNvgzNx/5203299.jpg" alt="Error" className="w-64 h-auto mb-8" /> {/* Adjust the width as needed */}
      <div className="text-center">
        <h2 className="text-2xl text-red-500 font-bold">Oops! Something went wrong</h2>
        <p className="text-white text-xl font-bold ">We're sorry, but it seems there was an error. Please try again later.</p>

        <Link to='/'> <button className="btn btn-accent mt-10"> Go Back  </button> </Link>
      </div>
    </div>
    );
};

export default ErrorPage;