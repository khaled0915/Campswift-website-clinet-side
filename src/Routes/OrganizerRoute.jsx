import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useOrganizer from "../hooks/useOrganizer";
import { Children } from "react";


const OrganizerRoute = ({children}) => {


    const {user , loading } = useAuth();

    const [ isOrganizer , isOrganizerLoading ] = useOrganizer();

    const location =  useLocation();

if( loading || isOrganizerLoading ){
    return <progress className="progress progress-warning w-56" value={0} max="100"></progress>
}


if( user && isOrganizer  ){
    return children
}


    return <Navigate to='/login' state={{from : location}} replace>  </Navigate>
};

export default OrganizerRoute;