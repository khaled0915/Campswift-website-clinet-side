import { Helmet } from "react-helmet-async";
import useParticipant from "../../../hooks/useParticipant";
import { FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


const RegisteredCamp = () => {




    const [participant] = useParticipant()
    console.log(participant);











    return (
        <div className="bg-pink-400 text-black">

<Helmet>
                <title> Dashboard | registered Camp  </title>

            </Helmet>
            <h3 className="text-3xl text-center mb-10 underline p-3  text-lime-700 font-bold"> This is registered camp </h3>
{
    participant.length ? 

    <Link to='/dashboard/payment'>

<button 


className="btn p-5 m-5 btn-wide btn-outline btn-success font-bold">
     Pay </button>

 </Link>
 :
 <button
 
 disabled
 className="btn"> 


    
     </button>
}
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Camp Name</th>
        <th> Date and Time  </th>
        <th>Venue </th>
        <th> Camp Fees  </th>
        <th> Payment Status  </th>
        <th> Confirmation Status   </th>
        <th> Action   </th>
        
      </tr>
    </thead>
    <tbody>
      {
        participant.map((user , index) => 
            <tr key={user._id}>

            <th>{index+1}</th>
          
            <td> {user.
campName } </td>


            <td> {user.scheduledDateTime
} </td>
            

            <td> {user.venueLocation
} </td>


            <td> {user.campFees
} </td>


<td> Unpaid </td>

<td> Pending </td>

<td> Cancel </td>



          

                 
          </tr>)
      }
     
     
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default RegisteredCamp;