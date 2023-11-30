import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

import useCamp from "../../hooks/useCamp";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useOrganizer from "../../hooks/useOrganizer";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const CampDetails = () => {

  const [isOrganizer] = useOrganizer() ;


  const  {user} = useAuth();


  // console.log(' current user in the site'  ,user);

  const [camp ,  , refetch] = useCamp();

  // console.log(camp);




  const axiosSecure = useAxiosSecure();


    const handleJoinCamp = event =>{

      console.log(user.email);

      if(user && user.email)

      {


        event.preventDefault();
        const form  = event.target;
        
        const name = form.name.value ;

        const age = form.age.value ;
        
        const phone = form.phone.value ;
        const address = form.address.value ;
        const emergency_contact = form.emergency_contact.value ;
        const gender = form.gender.value ;

        // const gender = form.gender.value;

        const participantInfo = {

          campId : filteredCamp._id ,
          email : user.email ,


          campName : filteredCamp.campName ,

          campFees : filteredCamp.campFees,

          image : filteredCamp.image ,
          specializedServices : filteredCamp.specializedServices,

          targetAudience :filteredCamp.targetAudience ,

          venueLocation : filteredCamp.venueLocation ,
          purposeBenefits : filteredCamp.purposeBenefits ,
          scheduledDateTime : filteredCamp.scheduledDateTime,
          healthcareProfessionals : filteredCamp.healthcareProfessionals ,

          participantName : name ,
          participantAge : age ,
          participantPhone : phone ,
          participantEmergency_contact : emergency_contact ,
          participantAddress : address ,
          participantGender : gender 
        }

        axiosSecure.post('/participant' , participantInfo)
        .then( res =>{
          if(res.data.insertedId){
            console.log('info added');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ' info saved successfully ',
              showConfirmButton: false,
              timer: 1500
            });
            refetch();
            

          }
        } )

        // console.log(participantInfo );


      }


        
        




       




      

       
    }

     



   

  const { id } = useParams();
  console.log(id);

  // Check if 'camp' is not defined or empty
  if (!camp || camp.length === 0) {
    return <progress className="progress progress-warning w-56" value="100" max="100"></progress>; // or handle the absence of data in another way
  }

  // Find the camp with the matching ID
  const filteredCamp = camp.find(item => item._id === id);

  // Check if the camp with the given ID is not found
  if (!filteredCamp) {
    return <p>Camp not found</p>; // or handle the absence of the specific camp in another way
  }

  console.log(filteredCamp);

  return (
    <div>
        <Helmet>
                <title> CampSwift | Camp_Details  </title>

            </Helmet>
      <div className="hero min-h-screen bg-base-200">
     
        <div className="hero-content flex-col lg:flex-row-reverse">
        
          <img src={filteredCamp.image} className="max-w-sm rounded-lg shadow-2xl" alt={filteredCamp.campName} />
          <div>
          <h1 className="text-5xl underline  font-bold">{filteredCamp.campName}</h1>


            <p className="py-6 text-2xl text-orange-500 text-center "> {
                filteredCamp.purposeBenefits
            } </p>



          <div className="bg-yellow-600 text-white font-bold text-center underline my-5 p-3 space-y-5 hover:text-green-300">
          <p> Date of The Campaign : {filteredCamp.scheduledDateTime
} </p>

<p> Venue : {filteredCamp.venueLocation} </p> 
<p> Target Audience : {filteredCamp.targetAudience} </p> </div>


            

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            {
              isOrganizer  ? 


              <button className="btn btn-accent hidden ">
                
                Organizer 
                 </button>

              

  :


  <button 


className="btn mt-10  btn-outline btn-primary mx-auto"
 onClick={()=>document.getElementById('my_modal_5').showModal()}>  Join Camp 
  </button>
            }


<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">

  <div className="modal-box">

  <form onSubmit={handleJoinCamp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Name </span>
          </label>
          <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Age </span>
          </label>
          <input type="number" name='age' placeholder="age" className="input input-bordered" required />

          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Phone </span>
          </label>
          <input type="text" name='phone' placeholder="phone" className="input input-bordered" required />

          
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text"> Address </span>
          </label>
          <input type="text" name='address' placeholder="address" className="input input-bordered" required />

          
        </div>


        <select name='gender' className="select select-accent w-full max-w-xs">
  <option  defaultValue='disabled' selected> Select Your Gender </option>
  
  <option> Male </option>
  <option> Female </option>
</select>





        <div className="form-control">
          <label className="label">
            <span className="label-text"> Emergency Contact </span>
          </label>
          <input type="text" name='emergency_contact' placeholder="Emergency Contact" className="input input-bordered" required />

          
        </div>












        <div className="form-control mt-6">

          

          <input  type="submit" value='Join' className="btn btn-secondary btn-outline" />
        </div>


      </form>


    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>

    </div>

   

  </div>
</dialog>

<Link to='/availableCamps'> 

<button className="btn ml-10  mx-auto btn-outline font-bold md:btn-wide btn-accent"> See All  </button>
 </Link>


          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

   


export default CampDetails;