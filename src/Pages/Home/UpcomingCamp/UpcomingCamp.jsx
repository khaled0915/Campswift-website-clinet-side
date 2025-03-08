import { FaCalendarAlt, FaMapMarkerAlt, FaTools, FaArrowRight, FaUserFriends } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UpcomingCamp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        
        const section = document.getElementById('upcoming-camp-section');
        if (section) {
            observer.observe(section);
        }
        
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <section id="upcoming-camp-section" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="h-1 w-8 bg-primary rounded"></div>
                        <p className="text-primary font-medium uppercase tracking-wider text-sm">Mark Your Calendar</p>
                        <div className="h-1 w-8 bg-primary rounded"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Upcoming Medical Camps
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay informed about our upcoming events and be part of our mission to provide quality healthcare to communities.
                    </p>
                </div>

                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Featured Camp Image */}
                        <div className="rounded-xl overflow-hidden shadow-lg relative h-96">
                            <img 
                                src="https://i.ibb.co/wM9mpb3/5063406.jpg" 
                                alt="Family Wellness Day" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Featured Event</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Family Wellness Day</h3>
                                <p className="text-gray-200 text-sm mb-4">
                                    A comprehensive health event for the entire family featuring checkups, workshops, and activities.
                                </p>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaCalendarAlt className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Date & Time</h4>
                                        <p className="text-gray-600">September 10th, 2023</p>
                                        <p className="text-gray-600">9:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaMapMarkerAlt className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Location</h4>
                                        <p className="text-gray-600">Community Recreation Center</p>
                                        <p className="text-gray-600">123 Health Street, Medical City</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaUserFriends className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Target Audience</h4>
                                        <p className="text-gray-600">Families and individuals of all ages</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaTools className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Services & Activities</h4>
                                        <ul className="text-gray-600 list-disc ml-4 mt-1">
                                            <li>Family health checkups</li>
                                            <li>Fitness workshops</li>
                                            <li>Nutrition consultations</li>
                                            <li>Mental health awareness</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <button 
                                    onClick={() => window.alert("Registration functionality will be implemented soon!")}
                                    className="btn btn-primary text-white px-6 py-3 rounded-full inline-flex items-center gap-2"
                                >
                                    <span>Register Now</span>
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 italic">
                            Don&apos;t miss out on a day of holistic well-being for you and your family!
                        </p>
                        
                        <div className="mt-6">
                            <Link to="/availableCamps" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                                <span>View All Available Camps</span>
                                <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingCamp;
