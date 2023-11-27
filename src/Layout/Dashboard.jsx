import { FaAddressBook, FaCampground, FaHome, FaMoneyBill, FaReadme, FaRegBookmark, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useOrganizer from "../hooks/useOrganizer";


const Dashboard = () => {

    const [isOrganizer] = useOrganizer() ;



    return (
        <div className="flex">

            <div className="w-64 min-h-screen  bg-red-500">
                <ul className="camp p-5">

                    {
                        isOrganizer ? <>

                            <li>


                                <NavLink to='/dashboard/ organizer-profile'>

                                    <div className="flex bg-yellow-500 rounded-lg items-center justify-center gap-3">
                                        <FaUser></FaUser>


                                        organizer-profile






                                    </div>


                                </NavLink>

                            </li>

                            <li>
                                <NavLink to='/dashboard/add-a-camp'>


                                    <div className="flex items-center bg-blue-400 rounded-lg justify-center gap-3 mt-3">
                                        <FaRegBookmark></FaRegBookmark>
                                        add camps
                                    </div>


                                </NavLink>

                            </li>

                            <li>
                                <NavLink to='/dashboard/users'>


                                    <div className="flex items-center bg-slate-400 rounded-lg justify-center gap-3 mt-3">
                                        <FaUser></FaUser>
                                        All users
                                    </div>


                                </NavLink>

                            </li>


                            <li>
                                <NavLink to='/dashboard/manage-camps'>

                                    <div className="flex items-center bg-orange-300 rounded-lg justify-center gap-3 mt-3">
                                        <FaCampground></FaCampground>
                                        manage camps
                                    </div>

                                </NavLink>

                            </li>
                            <li>
                                <NavLink to='/dashboard/manage-registered-camps'>

                                    <div className="flex items-center bg-cyan-400 rounded-lg justify-center gap-3 mt-3">
                                        <FaAddressBook></FaAddressBook>
                                        manage registered camps
                                    </div>

                                </NavLink>

                            </li>

                        </>

                            :


                            <>
                                <li>
                                    <NavLink to='/dashboard/participant-profile'>

                                        <div className="flex bg-yellow-500 rounded-lg items-center justify-center gap-3">
                                            <FaUser></FaUser>

                                            Participant_profile





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

                            </>
                    }


                    {/* divider */}

                    <div className="divider divider-warning"></div>

                    <li>
                        <NavLink to='/'>

                            <div className="flex items-center bg-cyan-400 rounded-lg justify-center gap-3 mt-3">
                                <FaHome></FaHome>
                                Home
                            </div>

                        </NavLink>

                    </li>

                    <li>
                        <NavLink to='/availableCamps'>

                            <div className="flex items-center bg-cyan-400 rounded-lg justify-center gap-3 mt-3">
                                <FaCampground></FaCampground>
                                Available Camps
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