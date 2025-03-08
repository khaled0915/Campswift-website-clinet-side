import { useState, useEffect } from 'react';
import { FaHeartbeat, FaAppleAlt, FaRunning, FaBed, FaWater } from 'react-icons/fa';

const HealthTip = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);

    // Collection of health tips
    const healthTips = [
        {
            title: "Balanced Nutrition",
            icon: <FaAppleAlt />,
            description: "Ensure a balanced diet by incorporating a variety of fruits and vegetables into your meals. These foods are rich in vitamins and minerals, promoting overall health.",
            color: "from-green-500 to-emerald-600"
        },
        {
            title: "Stay Hydrated",
            icon: <FaWater />,
            description: "Drink at least 8 glasses of water daily to maintain proper hydration. Water helps in digestion, absorption, circulation, and maintaining body temperature.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            title: "Regular Exercise",
            icon: <FaRunning />,
            description: "Aim for at least 30 minutes of moderate physical activity daily. Regular exercise improves heart health, boosts energy, and enhances mental well-being.",
            color: "from-orange-500 to-amber-600"
        },
        {
            title: "Quality Sleep",
            icon: <FaBed />,
            description: "Prioritize 7-9 hours of quality sleep each night. Good sleep is essential for immune function, metabolism, memory, and learning.",
            color: "from-indigo-500 to-purple-600"
        }
    ];

    // Auto-rotate tips every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % healthTips.length);
        }, 8000);
        
        return () => clearInterval(interval);
    }, [healthTips.length]);

    // Reveal animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        
        const section = document.getElementById('health-tip-section');
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
        <section id="health-tip-section" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="h-1 w-8 bg-primary rounded"></div>
                        <p className="text-primary font-medium uppercase tracking-wider text-sm">Wellness Wisdom</p>
                        <div className="h-1 w-8 bg-primary rounded"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Daily Health Tips
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Simple, evidence-based tips to improve your health and wellbeing in your daily life.
                    </p>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    {/* Featured Tip Card */}
                    <div className={`col-span-1 lg:col-span-3 bg-gradient-to-br ${healthTips[currentTip].color} rounded-2xl overflow-hidden shadow-lg relative transition-all duration-500`}>
                        <div className="p-8 md:p-10 text-white">
                            <div className="text-4xl mb-6 opacity-80">
                                {healthTips[currentTip].icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Tip of the Day: {healthTips[currentTip].title}
                            </h3>
                            <p className="text-white/90 text-lg leading-relaxed mb-6">
                                &ldquo;{healthTips[currentTip].description}&rdquo;
                            </p>
                            
                            {/* Tip pagination */}
                            <div className="flex space-x-2 mt-4">
                                {healthTips.map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setCurrentTip(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentTip ? 'bg-white scale-125' : 'bg-white/50'}`}
                                        aria-label={`View tip ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-white/10 -z-0"></div>
                        <div className="absolute bottom-4 right-4 text-white/10 text-[200px] leading-none -z-0">
                            <FaHeartbeat />
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className="col-span-1 lg:col-span-2 rounded-2xl overflow-hidden shadow-lg h-full">
                        <img 
                            src="https://i.ibb.co/L8Vs7g0/3843691.jpg" 
                            alt="Health and wellness illustration" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                
                {/* Health Tip Quick Facts */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                        <div className="text-lg font-bold mb-2 text-gray-800">Did you know?</div>
                        <p className="text-gray-600">
                            Just 30 minutes of walking each day can reduce your risk of heart disease by up to 19%.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                        <div className="text-lg font-bold mb-2 text-gray-800">Quick Fact</div>
                        <p className="text-gray-600">
                            Eating a diet rich in fruits and vegetables can lower blood pressure and reduce risk of heart disease.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                        <div className="text-lg font-bold mb-2 text-gray-800">Remember</div>
                        <p className="text-gray-600">
                            The human body is about 60% water. Staying hydrated is crucial for all bodily functions.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                        <div className="text-lg font-bold mb-2 text-gray-800">Pro Tip</div>
                        <p className="text-gray-600">
                            Taking short breaks from sitting every 30 minutes can help improve your overall health.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthTip;