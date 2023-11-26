

const CampCard = ({camp}) => {
    console.log(camp);

    const {id , specializedServices
        , campName , healthcareProfessionals ,

        image , scheduledDateTime ,targetAudience ,
        venueLocation ,campFees
    } = camp ;

    return (
        <div>


            <div className="card lg:card-side bg-base-100 shadow-xl">

           

                
  <figure><img src={image} alt="Album"/></figure>
  
  <div className="card-body">

  <h2 className="card-title underline font-extrabold bg-cyan-500 "> {campName} </h2>
    

    
        <ul className="text-center mb-5" style={
             {
                listStyleType : "decimal"
             }

            }> 

            <h2 className="underline text-green-700 font-bold"> specializedServices </h2>

        <li> {specializedServices[0]}  </li>  
        <li> {specializedServices[1]} </li> 
        </ul>

        <ul style={ {
            listStyleType : "revert"
        } } >  

            <h2 className="underline uppercase font-bold text-orange-700"> healthcareProfessionals  </h2>

        <li> {healthcareProfessionals[0]} </li>
        <li> {healthcareProfessionals[1]} </li>
            
             </ul>


             <p className="text-left text-cyan-600 "> Venue : {venueLocation} </p>

             <p className="hover:underline text-left text-yellow-600"> Time : {scheduledDateTime}  </p>

             <p className="underline text-violet-800 ">  target Audience : {targetAudience}  </p>

             <p className="bg-orange-700 text-white font-bold hover:underline mt-10 ">   camp Fees : {campFees} </p>


             <button className="btn btn-outline btn-success mt-5 "> Details  </button>



    
  </div>
</div>
            
        </div>
    );
};

export default CampCard;