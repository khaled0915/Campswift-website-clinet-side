import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import useCamp from "../../hooks/useCamp";
import useParticipant from "../../hooks/useParticipant";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaUsers } from "react-icons/fa";

const AvailableCamps = () => {
    const [camp, , refetch] = useCamp();
    const [participant] = useParticipant();
    
    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCamps, setFilteredCamps] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    // Filter camps based on search term and selected filter
    useEffect(() => {
        setIsLoading(true);
        
        let filtered = [...camp];
        
        // Apply search term filter
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(item => 
                item.campName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.venueLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.targetAudience?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply category filter
        if (selectedFilter !== "all") {
            if (selectedFilter === "upcoming") {
                // Filter for upcoming camps (simplified - would need proper date comparison)
                const today = new Date();
                filtered = filtered.filter(item => new Date(item.scheduledDateTime) > today);
            } else if (selectedFilter === "popular") {
                // Show camps with highest participation first
                filtered = [...filtered].sort((a, b) => 
                    (b.participantCount || 0) - (a.participantCount || 0)
                );
            }
        }
        
        setFilteredCamps(filtered);
        setIsLoading(false);
    }, [camp, searchTerm, selectedFilter]);

    // Helper function to safely render array data
    const safeRenderArray = (array, limit = 2) => {
        if (!array || !Array.isArray(array)) {
            return [];
        }
        return array.slice(0, limit);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>CampSwift | Available Camps</title>
            </Helmet>

            {/* Hero section */}
            <div className="relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-r from-blue-600 to-primary">
                <div className="absolute inset-0 bg-opacity-40 mix-blend-multiply"></div>
                <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8 lg:py-24 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Available Medical Camps</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-white opacity-90">
                        Explore our upcoming medical camps and join us in making healthcare accessible to all communities.
                    </p>
                    
                    {/* Search and filter controls */}
                    <div className="mt-10 max-w-xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search for camps..."
                                    className="block w-full px-4 py-3 pl-10 text-md rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                            
                            <div className="flex-shrink-0">
                                <div className="relative inline-block text-left">
                                    <select
                                        className="appearance-none bg-white px-4 py-3 pr-8 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                    >
                                        <option value="all">All Camps</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="popular">Most Popular</option>
                                    </select>
                                    <FaFilter className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Camp cards grid */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : filteredCamps.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-5xl text-gray-300 mb-4">😢</div>
                    <h3 className="text-2xl font-bold text-gray-700">No camps found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                    <button 
                        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedFilter("all");
                            refetch();
                        }}
                    >
                        View All Camps
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredCamps.map((item) => (
                        <div 
                            key={item._id} 
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.campName || "Medical Camp"} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium px-2 py-1 rounded-full flex items-center">
                                    <FaUserAlt className="mr-1" />
                                    <span>{participant.length || 0} joined</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.campName || "Medical Camp"}</h3>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start">
                                        <FaCalendarAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-gray-600">{item.scheduledDateTime || "Date not specified"}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-gray-600">{item.venueLocation || "Location not specified"}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FaUsers className="text-primary mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-gray-600">{item.targetAudience || "General public"}</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Specialized Services:</h4>
                                    {!item.specializedServices || !Array.isArray(item.specializedServices) || item.specializedServices.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No specialized services listed</p>
                                    ) : (
                                        <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
                                            {safeRenderArray(item.specializedServices).map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    <h4 className="font-medium text-gray-700 mb-2">Healthcare Professionals:</h4>
                                    {!item.healthcareProfessionals || !Array.isArray(item.healthcareProfessionals) || item.healthcareProfessionals.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No healthcare professionals listed</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {safeRenderArray(item.healthcareProfessionals).map((professional, index) => (
                                                <div key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center">
                                                    <FaUserMd className="mr-1" />
                                                    {professional}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <Link to={`/camps/camp-details/${item._id}`} className="block mt-4"> 
                                    <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Pagination (simplified) */}
            {filteredCamps.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded-md bg-primary text-white">
                            1
                        </button>
                        <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                            3
                        </button>
                        <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default AvailableCamps;