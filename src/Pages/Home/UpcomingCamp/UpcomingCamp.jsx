import { FaCalendarAlt, FaMapMarker, FaTools } from "react-icons/fa";


const UpcomingCamp = () => {
    return (
   
<> 

<h1 className="mb-5 text-5xl text-center  font-extrabold text-green-600  underline"> 
      Upcoming Events </h1>

<div className="hero min-h-screen"

style={{backgroundImage: 'url(https://i.ibb.co/wM9mpb3/5063406.jpg)'}}

>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
    

      <p className="mb-5 text-white font-bold ">"Don't Miss Out! Join our upcoming 'Family Wellness Day' on September 10th at the Community Recreation Center. Enjoy family health checkups, fitness workshops, and more for a day of holistic well-being."</p>



<div className="items-center">
<h2 className="underline text-3xl  font-bold text-yellow-400 mb-10  ">
        
        Family Wellness Day
      </h2>


      <div className="flex font-bold text-white justify-between items-center  ">
      <p>
        
        Date: September 10th
      </p>
      <span className="icon">
          <FaCalendarAlt />
        </span>
      </div>


     <div className="flex justify-between items-center mt-5 font-bold text-white">
     <p>
       
       Venue: Community Recreation Center
     </p>
     <span className="icon">
         <FaMapMarker />
       </span>
     </div>


      <div className="flex font-bold text-white items-center justify-between gap-7 mt-5">
      <p>
        
        Workshops: Family health checkups, fitness workshops, and more
      </p>
      <span className="icon">
          <FaTools />
        </span>
      </div>
      <p className="mt-5 text-xl text-pink-200">
        Don't miss out on a day of holistic well-being for you and your family!
      </p>
</div>


      
    </div>
  </div>
</div>
 </>





    );
};

export default UpcomingCamp;
