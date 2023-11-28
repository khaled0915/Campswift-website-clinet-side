import { Helmet } from "react-helmet-async";
import useCamp from "../../hooks/useCamp";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import useParticipant from "../../hooks/useParticipant";


const AvailableCamps = () => {


    const [camp , refetch ] = useCamp();

    const [participant] = useParticipant()

    const axiosPublic = useAxiosPublic();


    console.log( 'in the available camps' ,camp);

    return (
        <div>
             <Helmet>
                <title> CampSwift | Available Camps  </title>

            </Helmet>


            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}


    <thead>
      <tr>


        <th>
          #
          
        </th>
        <th> Camp Name</th>
        <th>Image </th>
        <th> Date  </th>
        <th > Venue  </th>
        <th > Service Provide  </th>
        <th > HealthCare Professionals   </th>
        <th > Target Audience   </th>
        <th> action </th>
        <th> participant Count </th>
      </tr>
    </thead>
    <tbody>


      {
        camp.map( (item, index) =>   <tr key={item._id}>
        <th>
        {index+1}
        </th>

        <td>
          {item.campName}
        </td>

        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          {item.scheduledDateTime}
        </td>
        <td>
          {item.venueLocation
}
        </td>
        <td>

          <td>
            <li>
            {item.specializedServices[0]}

            </li>
            <li>
            {item.specializedServices[1]}

            </li>
            
          </td>

       
        </td>


        <td>
          <li>
          {item.healthcareProfessionals[0]}

          </li>
          <li>
          {item.healthcareProfessionals[1]}

          </li>

         
        </td>
        <td>
          {item.targetAudience}
        </td>

        
        <th>


        <Link to={`/camp/camp-details/${item._id}`} > 
            
            <button 

             
className="btn btn-outline btn-success mt-5 "> Details  </button>
             </Link>


          


        </th>


        <th>
        <button className="btn btn-active mt-5">
                <FaUserAlt></FaUserAlt>
                 +{  participant.length}
                     </button> </th>
      </tr> )
      }
    
     
     
      
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default AvailableCamps;