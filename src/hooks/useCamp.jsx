
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamp = () => {

    // const [ camps , setCamp ] = useState([]);

    // const [loading , setLoading]  = useState(true);

    // useEffect( ()=>{


    //     fetch('http://localhost:5000/camp')
    //     .then(res => res.json())
    //     .then(data =>{
    //         setCamp(data);
    //         setLoading(false);
    //     })



    // } , [])


    // using tanstack 

    const axiosPublic = useAxiosPublic();

    const { data : camp = [] , isPending : loading , refetch } = useQuery({
        queryKey : ['camp'] ,
        queryFn : async () =>{
            const res  = await axiosPublic.get('/camp')
            return res.data; 
        }
    })

    return[ camp , loading   , refetch]
    
};

export default useCamp;