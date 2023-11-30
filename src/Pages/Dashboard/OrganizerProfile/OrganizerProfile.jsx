import { useLoaderData } from "react-router-dom";


const OrganizerProfile = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>

            <h3 className="text-4xl text-center underline text-red-400 font-bold p-5"> This is your profile </h3>
            
        </div>
    );
};

export default OrganizerProfile;