import { useState } from "react";
import useCamp from "../../../hooks/useCamp";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTrashAlt, FaEdit, FaSearch } from "react-icons/fa";
import UpdateCampModal from "./UpdateCampModal";

const ManageCamp = () => {
    const [camp, , refetch] = useCamp();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Filter camps based on search
    const filteredCamps = camp.filter(item => 
        item.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.venueLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteCamp = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    const res = await axiosSecure.delete(`/delete-camp/${item._id}`);
                    setIsLoading(false);
                    
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${item.campName} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    setIsLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Operation Failed",
                        text: "There was an error deleting this camp. Please try again."
                    });
                }
            }
        });
    };

    const handleOpenUpdateModal = (camp) => {
        setSelectedCamp(camp);
        setIsModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedCamp(null);
        setIsModalOpen(false);
    };

    const handleUpdateCamp = async (updatedCamp) => {
        setIsLoading(true);
        
        try {
            const res = await axiosSecure.put(`/update-camp/${updatedCamp._id}`, updatedCamp);
            
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Camp Updated Successfully",
                    text: `${updatedCamp.campName} has been updated.`,
                    confirmButtonColor: "#3085d6"
                });
                return Promise.resolve();
            } else {
                throw new Error("No changes were made");
            }
        } catch (error) {
            console.error("Error updating camp:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "There was an error updating this camp. Please try again."
            });
            return Promise.reject(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to truncate text
    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className="bg-gray-50 p-6 min-h-screen">
            <Helmet>
                <title>Dashboard | Manage Camps</title>
            </Helmet>

            {/* Page header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Medical Camps</h1>
                <p className="text-gray-600">View, edit, and manage your medical camps.</p>
            </div>

            {/* Search and actions bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search camps by name, location, or audience..."
                        className="pl-10 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <Link to="/dashboard/add-a-camp" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center gap-2 whitespace-nowrap">
                    <span>+ Add New Camp</span>
                </Link>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Camp Cards Grid */}
            {!isLoading && (
                <>
                    {filteredCamps.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                            <h3 className="text-xl font-medium text-gray-800">No camps found</h3>
                            <p className="text-gray-600 mt-2">
                                {searchTerm ? "Try adjusting your search criteria." : "You haven't added any camps yet."}
                            </p>
                            {searchTerm && (
                                <button 
                                    className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                    onClick={() => setSearchTerm("")}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCamps.map((item) => (
                                <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                    {/* Camp Image */}
                                    <div className="w-full h-48 relative overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.campName} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-0 right-0 p-2 flex gap-2">
                                            <button 
                                                onClick={() => handleOpenUpdateModal(item)}
                                                className="p-2 bg-white text-primary rounded-lg shadow hover:bg-primary hover:text-white transition-colors"
                                                title="Edit Camp"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteCamp(item)}
                                                className="p-2 bg-white text-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition-colors"
                                                title="Delete Camp"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Camp Details */}
                                    <div className="p-5 flex-grow">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.campName}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{truncateText(item.purposeBenefits, 120)}</p>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <FaCalendarAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{item.scheduledDateTime}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{item.venueLocation}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <FaUsers className="text-primary mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{item.targetAudience}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card Footer */}
                                    <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                        <div className="text-sm font-medium">
                                            <span className="text-gray-500">Fee:</span> 
                                            <span className="ml-1 text-gray-800">${item.campFees}</span>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleOpenUpdateModal(item)}
                                                className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors"
                                            >
                                                Edit Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Pagination - could be implemented if needed */}
            {filteredCamps.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Previous</button>
                        <button className="px-3 py-1 rounded bg-primary text-white">1</button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Next</button>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            <UpdateCampModal 
                isOpen={isModalOpen}
                onClose={handleCloseUpdateModal}
                campDetails={selectedCamp}
                onUpdate={handleUpdateCamp}
            />
        </div>
    );
};

export default ManageCamp;