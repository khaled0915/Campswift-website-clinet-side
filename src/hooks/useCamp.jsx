
import { useEffect, useState } from "react";


const useCamp = () => {

    const [ camps , setCamp ] = useState([]);

    const [loading , setLoading]  = useState(true);

    useEffect( ()=>{


        fetch('PopularCamp.json')
        .then(res => res.json())
        .then(data =>{
            setCamp(data);
            setLoading(false);
        })



    } , [])

    return[ camps , loading ]
    
};

export default useCamp;