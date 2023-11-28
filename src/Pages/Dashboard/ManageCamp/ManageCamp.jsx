
import useCamp from "../../../hooks/useCamp";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageCamp = () => {

    const [camp , refetch] = useCamp();
    const axiosSecure  = useAxiosSecure();


    const handleDeleteCamp =  (item) =>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/delete-camp/${item._id}`)
                // console.log(res.data);
                if(res.data.deletedCount > 0){
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                     
                }





           
            }
          });



    }



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

          
            <li>
            {item.specializedServices[0]}

            </li>
            <li>
            {item.specializedServices[1]}

            </li>
            
          

       
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

            onClick={ () => handleDeleteCamp(item) }

             
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