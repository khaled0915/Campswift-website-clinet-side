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




            <div className="overflow-x-auto">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th className="font-bold text-red-700 bg-green-400 pr-3  ">Camp Name</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3 ">Date and Time,</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3">Venue</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3 "> Camp
Fees</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3 ">  Payment Status</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3 "> Confirmation Status</th>
        <th className="font-bold text-red-700 bg-green-400 pr-3 ">  Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        RegInfo.map((user , index) => 
            <tr key={user._id}>

            <th className="font-bold text-sm bg-orange-700 text-white ">{index+1}</th>
            <td className=" font-bold bg-purple-500 "> {user.campName } </td>
            <td className="font-bold bg-pink-400 "> {user.scheduledDateTime
} </td>
            <td className="font-bold bg-slate-300"> 

              {user.venueLocation}


  
                
           
                 </td>

                 <td className="font-bold bg-green-600">
                  {user.campFees}
                 </td>

                 <td className="font-bold bg-red-400">
                  Yet to pay
                 </td>

                 <td className="font-bold bg-fuchsia-500">
                  <button className="btn"> pending </button>
                 </td>

                 <td className="font-bold bg-sky-500"> 
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