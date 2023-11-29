
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamp = () => {


    // using tanstack 

    const axiosPublic = useAxiosPublic();

    const { data : camp = [] , isPending : loading , refetch } = useQuery({
        queryKey : ['camps'] ,
        queryFn : async () =>{
            const res  = await axiosPublic.get('/camps')
            return res.data; 
        }
    })

    return[ camp , loading   , refetch]
    
};

export default useCamp;