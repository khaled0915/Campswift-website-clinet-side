import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaUsers, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CampCard = ({ camp }) => {
    const {
        _id,
        specializedServices,
        campName,
        healthcareProfessionals,
        image,
        scheduledDateTime,
        targetAudience,
        venueLocation,
        campFees
    } = camp;

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image */}
            <div className="relative">
                <img
                    src={image}
                    alt={campName}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Popular
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {campName}
                </h3>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="text-primary mr-2" />
                        <span className="text-sm">{formatDate(scheduledDateTime)}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-600">
                        <FaMapMarkerAlt className="text-primary mr-2 mt-1" />
                        <span className="text-sm line-clamp-2">{venueLocation}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                        <FaUserMd className="text-primary mr-2" />
                        <span className="text-sm">{healthcareProfessionals} Healthcare Professionals</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                        <FaUsers className="text-primary mr-2" />
                        <span className="text-sm">For {targetAudience}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <FaDollarSign className="text-primary" />
                            <span className="font-bold text-gray-800">${campFees}</span>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {specializedServices && specializedServices.length > 0 ? specializedServices[0] : 'General Care'}
                        </div>
                    </div>

                    <Link to={`/camps/camp-details/${_id}`} className="block">
                        <button className="w-full btn btn-outline btn-primary rounded-lg hover:shadow-md transition-all duration-300">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

CampCard.propTypes = {
    camp: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        campName: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        specializedServices: PropTypes.array,
        healthcareProfessionals: PropTypes.number,
        scheduledDateTime: PropTypes.string.isRequired,
        targetAudience: PropTypes.string,
        venueLocation: PropTypes.string.isRequired,
        campFees: PropTypes.number.isRequired
    }).isRequired
};

export default CampCard;