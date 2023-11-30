import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaCampground } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY ;


const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddCamp = () => {

    const { register, handleSubmit , reset } = useForm()

    const axiosPublic = useAxiosPublic();

    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {


        const imageFile = {image : data.image[0]}

        const res = await axiosPublic.post(image_hosting_api ,  imageFile ,{
            headers : {
                'content-type' : 'multipart/form-data'
            }
        } );
        console.log(res.data);

        if(res.data.success){

            const campData = {
                campName : data.campName ,
                image : res.data.data.display_url,
                campFees :  parseFloat(data.campFees) ,
                healthcareProfessionals : data.healthcareProfessionals ,
                specializedServices : data.specializedServices ,

                targetAudience :data.targetAudience ,

                venueLocation : data.venueLocation ,

                purposeBenefits:data.purposeBenefits ,

                scheduledDateTime:data.scheduledDateTime


            }


            const campRes = await axiosSecure.post('/camps' , campData)
            console.log(campRes.data);
            if(campRes.data.insertedId){
                reset()

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.campName} is added to the camp`,
                    showConfirmButton: false,
                    timer: 1500
                  });

            }



        }








        
        
        
        console.log(data)}
    return (
        <div className="p-5 bg-teal-300 m-5">

            <Helmet> 

                <title> Dashboard | Add a Camp </title>
            </Helmet>

            <h3 className="text-center font-bold text-3xl underline mb-10 text-yellow-600"> Add a camp  </h3>

            <div>
                
            <form onSubmit={handleSubmit(onSubmit)}>
     



      <div>

      <label className="label">
    <span className="label-text text-green-700 underline font-semibold"> Camp name : </span>
   
  </label>
      <input 
      
      {...register("campName")} 
     
     type="text" 
     placeholder="Type the CampName" className="input input-bordered input-accent w-full max-w-xs" />
      </div>



      <div className="flex gap-10">

      <div>

<label className="label">
<span className="label-text  text-green-700 underline font-semibold"> venue Location :</span>

</label>
<input 

{...register("venueLocation")} 

type="text" 
placeholder="enter the Location" className="input input-bordered input-accent w-full max-w-xs" />
</div>

<div>

<label className="label">
<span className="label-text  text-green-700 underline font-semibold"> scheduled DateTime :</span>

</label>
<input 

{...register("scheduledDateTime")} 

type="text" 
placeholder="enter the date ant time" className="input input-bordered input-accent w-full max-w-xs" />
</div>

      </div>


      


     


      <div>

      <label className="label">
    <span className="label-text  text-green-700 underline font-semibold"> specializedServices :</span>
   
  </label>
      <input 
      
      {...register("specializedServices")} 
     
     type="text" 
     placeholder="enter the specializedServices " className="input input-bordered input-accent w-full max-w-xs" />
      </div>

      <div>

      <label className="label">
    <span className="label-text  text-green-700 underline font-semibold"> healthcareProfessionals:</span>
   
  </label>
      <input 
      
      {...register("healthcareProfessionals")} 
     
     type="text" 
     placeholder="enter the name of healthcareProfessionals" className="input input-bordered input-accent w-full max-w-xs" />
      </div>


<div className="flex gap-10">

<div>

<label className="label">
<span className="label-text  text-green-700 underline font-semibold"> targetAudience:</span>

</label>
<input 

{...register("targetAudience")} 

type="text" 
placeholder="enter the targetAudience" className="input input-bordered input-accent w-full max-w-xs" />
</div>

<div>

<label className="label">
<span className="label-text  text-green-700 underline font-semibold"> 
campFees:</span>

</label>
<input 

{...register("campFees")} 

type="number" 
placeholder="enter the  campFees" className="input input-bordered input-accent w-full max-w-xs" />
</div>

</div>

     


    


     <div className="flex gap-10 justify-center items-center">
     <textarea {...register('purposeBenefits')} className="textarea mt-10 text-center  textarea-primary" placeholder="purposeBenefits"></textarea>



<input {...register('image',{required : true})} type="file" className="file-input file-input-bordered mt-10 file-input-warning w-full max-w-xs" />
     </div>
     








     




     


   <button className="btn text-center mt-5 btn-primary"> 
   
   <FaCampground></FaCampground>
   Add camp </button>


    </form>
            </div>


            
        </div>
    );
};

export default AddCamp;