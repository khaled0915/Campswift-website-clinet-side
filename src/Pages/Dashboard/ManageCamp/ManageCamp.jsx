
import useCamp from "../../../hooks/useCamp";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const ManageCamp = () => {

    const [camp ,,  refetch] = useCamp();
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
                        title: `${item.campName} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                     
                }





           
            }
          });



    }



  console.log(camp);






    console.log(camp);
    return (
        <div>
            <Helmet>
                <title> Dashboard | Manage Camps   </title>

            </Helmet>

            <h3 className="text-3xl uppercase text-white bg-pink-500 mt-10 mb-10 text-center"> this is manage camp page </h3>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="font-bold border border-r-2 bg-red-600 text-white   ">
      <th>
          #
          
        </th>
        <th className="border border-r-3"> Camp Name</th>
        <th className="border border-r-3">purposeBenefits</th>
        <th className="border border-r-3"> Date  </th>
        <th className="border border-r-3" > Venue  </th>
        <th className="border border-r-3"> Service Provide  </th>
        <th className="border border-r-3"> HealthCare Professionals   </th>
        <th className="border border-r-3" > Target Audience   </th>
        <th className="border border-r-3"> Action </th>
      </tr>
    </thead>
    <tbody>


    {
        camp.map( (item, index) =>   <tr key={item._id}>
        <th className="border border-r-3 text-white font-bold bg-green-600">
        {index+1}
        </th>

        <td className="border border-r-3 text-white font-bold bg-pink-600">
          {item.campName}
        </td>

        <td className="border border-r-3 text-white font-bold bg-red-500">
         
          {item.purposeBenefits}
        </td>

        <td className="border border-r-3 text-white font-bold bg-sky-600">
          {item.scheduledDateTime}
        </td>
        
        <td className="border border-r-3 text-white font-bold bg-yellow-600">
          {item.venueLocation
}
        </td>

        <td className="border border-r-3 text-white font-bold bg-orange-600">

          
            <li>
            {item.specializedServices[0]}

            </li>
            <li>
            {item.specializedServices[1]}

            </li>
            
          

       
        </td>


        <td className="border border-r-3 text-white font-bold bg-slate-400">
          <li>
          {item.healthcareProfessionals[0]}

          </li>
          <li>
          {item.healthcareProfessionals[1]}

          </li>

         
        </td>
        <td className="border border-r-3 text-white font-bold bg-purple-600">
          {item.targetAudience}
        </td>

        
        <th className="border border-r-3 text-white font-bol bg-teal-400">


        
            
            <button 

            onClick={ () => handleDeleteCamp(item) }

             
className="btn btn-outline text-red-700 btn-danger mt-5 ">
    
     DELETE 
     
      </button>


     <Link to={`/dashboard/update-camp-info/${item._id}`}>  <button  className="btn mt-5 btn-info"> update </button> </Link>
      

        </th>
      </tr>
      
      )
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