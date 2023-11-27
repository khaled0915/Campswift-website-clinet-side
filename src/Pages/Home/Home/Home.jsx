import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import PopularCamp from "../PopularCamp/PopularCamp";
import Testimonials from "../Testimonials/Testimonials";
import UpcomingCamp from "../UpcomingCamp/UpcomingCamp";
import HealthTip from "../HealthTip/HealthTip";
// import { useLoaderData } from "react-router-dom";

const Home = () => {


    // const camps = useLoaderData();

    // console.log(camps);


    return (
        <div>

            <Helmet>
                <title> CampSwift | Home  </title>

            </Helmet>
            <Banner></Banner>
            <PopularCamp></PopularCamp>
            <Testimonials></Testimonials>
            <UpcomingCamp></UpcomingCamp>
            <HealthTip></HealthTip>


            {/* <div>
                {
                    camps.map( camp =>{
                        <PopularCamp key={camp.id}>

                            camp ={camp}
                            
                             </PopularCamp>
                    } )
                }
            </div> */}
        </div>
    );
};

export default Home;