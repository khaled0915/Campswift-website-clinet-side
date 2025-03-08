import { useState, useEffect } from "react";
import useCamp from "../../../hooks/useCamp";
import CampCard from "./CampCard";
import { Link } from "react-router-dom";

const PopularCamp = () => {
    const [camp] = useCamp();
    const [isVisible, setIsVisible] = useState(false);
    const popularCamp = camp.filter(item => item.category === 'popular');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        
        const section = document.getElementById('popular-camps-section');
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
        <section id="popular-camps-section" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="h-1 w-8 bg-primary rounded"></div>
                        <p className="text-primary font-medium uppercase tracking-wider text-sm">Healthcare Excellence</p>
                        <div className="h-1 w-8 bg-primary rounded"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Popular Medical Camps
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our most sought-after medical camps designed to provide specialized care and support to diverse communities.
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    {popularCamp.map(camp => (
                        <CampCard key={camp._id} camp={camp} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/availableCamps" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                        <span>View All Medical Camps</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularCamp;