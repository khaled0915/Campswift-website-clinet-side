import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SocialLogin = () => {

    const {googleSignIn} =  useAuth();

    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            navigate('/')
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (


        <div className="p-8 text-center ">
            <div>
            <button onClick={handleGoogleSignIn} className="bg-red-600 btn text-xl" >
  <FaGoogle className="mr-4"></FaGoogle>
  Google
</button>
            </div>
        </div>
    );
};

export default SocialLogin;