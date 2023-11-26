
import { useEffect, useState } from "react";


const useCamp = () => {

    const [ camps , setCamp ] = useState([]);

    const [loading , setLoading]  = useState(true);

    useEffect( ()=>{


        fetch('http://localhost:5000/camp')
        .then(res => res.json())
        .then(data =>{
            setCamp(data);
            setLoading(false);
        })



    } , [])

    return[ camps , loading ]
    
};

export default useCamp;