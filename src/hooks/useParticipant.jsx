import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useParticipant = () => {


   const axiosSecure = useAxiosSecure();

   const {user} = useAuth();

    const { data : participant =  []  , refetch } = useQuery({
        queryKey : ['participant' , user?.email] ,
        queryFn : async () =>{
            const res = await axiosSecure.get(`/participant?email=${user.email}`)

            

            return res.data;
        }
    }) ;

    return [participant , refetch];
};

export default useParticipant;