import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUser } from "react-icons/fa";
import useParticipant from "../../../hooks/useParticipant";
import { useLoaderData } from "react-router-dom";


const ManageRegCamp = () => {

    // const axiosSecure = useAxiosSecure();

    // const { data : participant =  []  , refetch } = useQuery({
    //     queryKey : ['participant'] ,
    //     queryFn : async () =>{
    //         const res = await axiosSecure.get('/participant')

    //         return res.data;
    //     }
    // }) ;


    // const [participant  ] = useParticipant()

    // console.log(participant);

    const RegInfo = useLoaderData();

    console.log(RegInfo);



    return (
        <div>

<Helmet>
                <title> Dashboard | Manage registered Camps  </title>

            </Helmet>
            <h3 className="text-3xl text-center p-4 underline font-bold text-stone-500 ">This is manage reg camps</h3>


<h3> {RegInfo.length} </h3>


            <div className="overflow-x-auto">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Camp Name</th>
        <th>Date and Time,</th>
        <th>Venue</th>
        <th> Camp
Fees</th>
        <th>  Payment Status</th>
        <th> Confirmation Status</th>
        <th>  Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        RegInfo.map((user , index) => 
            <tr key={user._id}>

            <th>{index+1}</th>
            <td> {user.campName } </td>
            <td> {user.scheduledDateTime
} </td>
            <td> 

              {user.venueLocation}


  
                
           
                 </td>

                 <td>
                  {user.campFees}
                 </td>

                 <td>
                  Yet to pay
                 </td>

                 <td>
                  <button className="btn"> pending </button>
                 </td>

                 <td> 
                 <button

                 
              
              className="btn btn-ghost ">

                <FaTrash className="text-red-500"></FaTrash>
              </button> </td>
          </tr>)
      }

      
     
     
    </tbody>
  </table>
</div>





        </div>
    );
};

export default ManageRegCamp;