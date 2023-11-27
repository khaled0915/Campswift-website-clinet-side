import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AllUsers = () => {


    const axiosSecure = useAxiosSecure();

    const {data : users = [] , refetch} = useQuery({
        queryKey : ['users'] ,
        queryFn : async()=>{
            const res = await axiosSecure.get('/users')

            return res.data;
        }
    })


   const handleMakeOrganizer = user =>{


    axiosSecure.patch(`/users/organizer/${user._id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount> 0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an organizer now`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })

   }





    const handleDeleteUser = user =>{


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {

            if (result.isConfirmed) {



            axiosSecure.delete(`/users/${user._id}`)
            .then(res =>{
                // console.log(res);
                if(res.data.deletedCount > 0){
                    refetch()

                    
              Swal.fire({
                title: "Deleted!",
                text: "Participant  has been deleted.",
                icon: "success"
              });

                }

            })
            }
          });



    }
 







    return (
        <div>

<Helmet>
                <title> Dashboard | All users  </title>

            </Helmet>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl "> All users </h2>
                <h2 className="text-3xl"> total users {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user , index) => 
            <tr key={user._id}>

            <th>{index+1}</th>
            <td> {user.name } </td>
            <td> {user.email} </td>
            <td> 


   {  user.role === 'organizer' ? 'Organizer'
   :
    <button
    onClick={ () => handleMakeOrganizer(user) }
 
    
              className="btn btn-lg bg-orange-500 ">

                <FaUser className="text-white text-2xl"></FaUser>
              </button>}
                
           
                 </td>

                 <td> 
                 <button

                 onClick={ ()=> handleDeleteUser(user) }
              
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

export default AllUsers;