import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {


    const [feedbacks, setFeedbacks] = useState([]);

    useEffect( () =>{

        fetch( 'http://localhost:5000/feedbacks' )
        .then(res => res.json())
        .then( data=>  setFeedbacks(data) ) 

    } , [])



    return (
        <div className="mt-20 my-20 text-center ">
           
            <p className="text-yellow-500 text-3xl underline font-bold   mt-5"> ---Testimonials--- </p>
            
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        

        {
             feedbacks.map( feedback => <SwiperSlide key={feedback._id} 
             
             
             >

<div className="mx-24 my-16 flex flex-col items-center">
                <Rating
      style={{ maxWidth: 180 }}
      value={feedback.rating}
      readOnly

    />
    <FaQuoteLeft className="font-bold text-black text-6xl mt-10 mb-10" />
                    <p>{feedback.details} </p>
                    <p className="text-2xl text-orange-400"> {feedback.userName} </p>
                </div>


                
                
                 </SwiperSlide> )
        }
        
      </Swiper>
        
        </div>
    );
};

export default Testimonials;
