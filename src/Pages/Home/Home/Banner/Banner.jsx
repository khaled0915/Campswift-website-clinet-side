import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Content Section */}
                    <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="h-1 w-12 bg-primary rounded"></div>
                            <p className="text-primary font-medium">Healthcare For Everyone</p>
                            <div className="h-1 w-12 bg-primary rounded"></div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                            Welcome to <span className="text-primary">CampSwift</span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Empowering communities through accessible healthcare services. 
                            With over 50 successful medical camps conducted, we&apos;re bringing 
                            quality healthcare right to your doorstep.
                        </p>
                        
                        <div className="pt-6 flex flex-wrap gap-4 justify-center">
                            <Link to='/signUp'> 
                                <button className="btn btn-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                    Get Started
                                </button>
                            </Link>
                            <Link to='/availableCamps'> 
                                <button className="btn btn-outline btn-primary px-8 py-3 rounded-full hover:shadow-md transition-all duration-300">
                                    Explore Camps
                                </button>
                            </Link>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 max-w-3xl mx-auto">
                            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-4xl font-bold text-primary">50+</h3>
                                <p className="text-gray-600 mt-2">Medical Camps</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-4xl font-bold text-primary">10k+</h3>
                                <p className="text-gray-600 mt-2">Patients Served</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-4xl font-bold text-primary">100+</h3>
                                <p className="text-gray-600 mt-2">Medical Staff</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full -z-10 hidden lg:block"></div>
                <div className="absolute bottom-20 left-10 w-60 h-60 bg-blue-50 rounded-full -z-10 hidden lg:block"></div>
            </div>
        </div>
    );
};

export default Banner;