import { FaMoneyBill, FaReadme, FaRegBookmark, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">

            <div className="w-64 min-h-screen  bg-red-500">
                <ul className="camp p-5">

                    <li>
                        <NavLink to='/dashboard/participant-profile'>

                            <div className="flex bg-yellow-500 rounded-lg items-center justify-center gap-3">
                            <FaUser></FaUser>

Participant-Profile  

                            </div>

                           
                             </NavLink>

                    </li>

                    <li>
                        <NavLink to='/dashboard/registered-camps'>


                           <div className="flex items-center bg-blue-400 rounded-lg justify-center gap-3 mt-3">
                           <FaRegBookmark></FaRegBookmark>
                            Registered camps 
                           </div>


                             </NavLink>

                    </li>


                    <li>
                        <NavLink to='/dashboard/payment-history'>

                            <div className="flex items-center bg-orange-300 rounded-lg justify-center gap-3 mt-3">
                            <FaMoneyBill></FaMoneyBill>
                            payment-history
                            </div>

                             </NavLink>

                    </li>
                    <li>
                        <NavLink to='/dashboard/feedback-and-ratings'>

                         <div className="flex items-center bg-cyan-400 rounded-lg justify-center gap-3 mt-3">
                         <FaReadme></FaReadme>
                            feedback-and-ratings
                         </div>

                             </NavLink>

                    </li>
                </ul>
            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>


            
        </div>
    );
};

export default Dashboard;