import { useLoaderData } from "react-router-dom";

const UpdateCampInfo = () => {


    const item = useLoaderData() ;
    console.log(item);
    return (
        <div>

            <h3 className="text-3xl text-orange-500 font-bold underline uppercase text-center mt-10 p-5"> This is Update Camp page </h3>

            <h2> {item.length} </h2>
            
        </div>
    );
};

export default UpdateCampInfo;