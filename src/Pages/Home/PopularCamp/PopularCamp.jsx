import useCamp from "../../../hooks/useCamp";
import CampCard from "./CampCard";


const PopularCamp = () => {



    const [camps] = useCamp();

    const popularCamp = camps.filter( item => item.category ===  'popular' )

   
    console.log(camps);
    console.log(popularCamp);







    return (
        <div>

            <h1 className="text-3xl text-center text-yellow-700 font-bold mt-10 mb-10 underline"> Popular Medical  Camp  </h1>

            {/* <h3> camp  {camps.length} </h3> */}

           <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">
            {
               popularCamp.map( camp => <CampCard key={camp._id} 
               
                camp={camp}
               > </CampCard> )
            }
           </div>
            
        </div>
    );
};

export default PopularCamp;