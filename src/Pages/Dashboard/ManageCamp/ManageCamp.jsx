import { Link } from "react-router-dom";
import useCamp from "../../../hooks/useCamp";
import { FaPushed, FaTrashAlt, FaUpload } from "react-icons/fa";


const ManageCamp = () => {

    const [camp] = useCamp();



    console.log(camp);
    return (
        <div>

            <h3 className="text-3xl uppercase text-white bg-pink-500 mt-10 text-center"> this is manage camp page </h3>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
      <th>
          #
          
        </th>
        <th> Camp Name</th>
        <th>purposeBenefits</th>
        <th> Date  </th>
        <th > Venue  </th>
        <th > Service Provide  </th>
        <th > HealthCare Professionals   </th>
        <th > Target Audience   </th>
        <th> Action </th>
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
          {/* <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div> */}
          {item.purposeBenefits}
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


        
            
            <button 

             
className="btn btn-outline text-red-700 btn-danger mt-5 ">
    
     DELETE 
     
      </button>
      

<button className="btn btn-primary mt-5">
    
   Update </button>
             


          


        </th>
      </tr> )
      }
    
   
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
            </div>
        </div>
    );
};

export default ManageCamp;