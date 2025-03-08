import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch('https://medical-camp-management-server.vercel.app/feedbacks')
            .then(res => res.json())
            .then(data => setFeedbacks(data));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        
        const section = document.getElementById('testimonials-section');
        if (section) {
            observer.observe(section);
        }
        
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Custom rating styles
    const customStyles = {
        itemShapes: "star",
        activeFillColor: "#FF6B35",
        inactiveFillColor: "#FBD1B7"
    };

    return (
        <section id="testimonials-section" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="h-1 w-8 bg-primary rounded"></div>
                        <p className="text-primary font-medium uppercase tracking-wider text-sm">Patient Experiences</p>
                        <div className="h-1 w-8 bg-primary rounded"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Read testimonials from individuals who have participated in our medical camps and experienced our care firsthand.
                    </p>
                </div>

                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
                    {feedbacks.length > 0 ? (
                        <Swiper
                            navigation={true}
                            pagination={{ 
                                clickable: true,
                                dynamicBullets: true
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="mySwiper"
                            spaceBetween={20}
                            slidesPerView={1}
                        >
                            {feedbacks.map(feedback => (
                                <SwiperSlide key={feedback._id}>
                                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mx-auto my-4 max-w-3xl">
                                        <div className="mb-4 flex justify-center">
                                            <FaQuoteLeft className="text-primary opacity-20 text-5xl" />
                                        </div>
                                        
                                        <p className="text-gray-600 italic mb-6 text-center px-4 md:px-12">
                                            &ldquo;{feedback.details}&rdquo;
                                        </p>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="flex justify-center mb-3">
                                                <Rating
                                                    style={{ maxWidth: 120 }}
                                                    value={feedback.rating}
                                                    itemStyles={customStyles}
                                                    readOnly
                                                />
                                            </div>
                                            
                                            <div className="flex items-center justify-center">
                                                {feedback.userImage ? (
                                                    <img 
                                                        src={feedback.userImage} 
                                                        alt={feedback.userName}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                                        {feedback.userName ? feedback.userName[0].toUpperCase() : 'U'}
                                                    </div>
                                                )}
                                                <div className="ml-3">
                                                    <p className="font-semibold text-gray-800">{feedback.userName}</p>
                                                    {feedback.userRole && (
                                                        <p className="text-xs text-gray-500">{feedback.userRole}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Loading testimonials...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
