import { Helmet } from "react-helmet-async";
import useParticipant from "../../../hooks/useParticipant";


const UserProfile = () => {


    const [participant] = useParticipant()

    console.log(participant);


    







    return (
        <div className=" bg-emerald-400 text-black font-bold border  ">
            <h3 className="text-3xl text-center mb-10 underline p-3  text-lime-700 font-bold "> This is Participant profile </h3>
            <div>

<Helmet>
                <title> Dashboard | Participant Profile  </title>

            </Helmet>
            

            <div className="overflow-x-auto">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th> Participant  Name</th>
        <th> participantAge  </th>
        <th>participantAddress </th>
        <th> participantEmergency_contact
  </th>
        <th> participantPhone </th>
      <th> Update </th>
      </tr>
    </thead>
    <tbody>
      {
        participant.map((user , index) => 
            <tr key={user._id}>

            <th>{index+1}</th>
          
            <td> {user.
participantName
} </td>




            <td> {user.participantAge
} </td>
            

            <td> {user.participantAddress
} </td>


            <td> {user.participantEmergency_contact

} </td>

            <td> {user.participantPhone

} </td>

<td> Update info </td>






          

                 
          </tr>)
      }
     
     
    </tbody>
  </table>
</div>
            
        </div>
        </div>
    );
};

export default UserProfile;