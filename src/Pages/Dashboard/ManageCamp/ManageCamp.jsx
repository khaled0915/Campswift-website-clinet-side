
import useCamp from "../../../hooks/useCamp";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { useState } from "react";
import UpdateCampModal from "./UpdateCampModal";
import { Helmet } from "react-helmet-async";


const ManageCamp = () => {

    const [camp ,,  refetch] = useCamp();
    const axiosSecure  = useAxiosSecure();


    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);


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




    const handleUpdateClick = (item) => {
        setSelectedCamp(item);
        setUpdateModalOpen(true);
      };


       // Function to close the update modal
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };


   // Function to handle updating the camp details
   const handleUpdateCamp = async (updatedData) => {
    // Send the updated data to the server
    try {
      const res  = await axiosSecure.put(`/update-camp/${selectedCamp._id}`, updatedData);
      // Handle success, e.g., refetch the data
      refetch();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${selectedCamp.campName} has been updated`,
        showConfirmButton: false,
        timer: 1500
      });

      // Close the update modal
      handleCloseUpdateModal();
    } catch (error) {
      // Handle error
      console.error('Error updating camp:', error);
    }
  };

  console.log(camp);










    



    console.log(camp);
    return (
        <div>
            <Helmet>
                <title> Dashboard | Manage Camps   </title>

            </Helmet>

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


      <button onClick={() => handleUpdateClick(item)} className="btn btn-primary"> update </button>
      <UpdateCampModal
              isOpen={isUpdateModalOpen}
              onClose={handleCloseUpdateModal}
              campDetails={selectedCamp}
              onUpdate={handleUpdateCamp}
            />

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