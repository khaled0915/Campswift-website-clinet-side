import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";

// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'




const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Message Sent Successfully!",
                text: "We'll get back to you as soon as possible.",
                showConfirmButton: true,
                confirmButtonColor: "#FF6B35",
            });

            // Reset the form fields
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>CampSwift | Contact Us</title>
            </Helmet>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-primary py-20 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <svg className="absolute left-0 bottom-0 text-white/10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="currentColor" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <div className="absolute right-0 top-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-white/10"></div>
                    <div className="absolute left-1/4 top-1/3 w-8 h-8 rounded-full bg-white/20"></div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Get In Touch</h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
                        Have questions about our medical camps or need assistance? 
                        Our team is here to help you with any inquiries or concerns.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-primary text-white p-6">
                            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                            <p className="text-white/80">Reach out to us using the following details</p>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                                    <p className="text-gray-600">123 Medical Drive, Healthcare City, HC 12345</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Phone Number</h3>
                                    <p className="text-gray-600">+1 (123) 456-7890</p>
                                    <p className="text-gray-600">+1 (987) 654-3210</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Email Address</h3>
                                    <p className="text-gray-600">contact@campswift.com</p>
                                    <p className="text-gray-600">support@campswift.com</p>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-medium text-gray-900 mb-3">Connect With Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                        <FaFacebook size={18} />
                                    </a>
                                    <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                                        <FaTwitter size={18} />
                                    </a>
                                    <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors">
                                        <FaInstagram size={18} />
                                    </a>
                                    <a href="#" className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors">
                                        <FaLinkedin size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Map or Image */}
                        <div className="relative h-64 overflow-hidden">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215685397371!2d-73.98509692347811!3d40.748432471278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1652785796071!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                className="absolute inset-0 border-0"
                                allowFullScreen=""
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CampSwift Location"
                            ></iframe>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="johndoe@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Type your message here..."
                                        required
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        
                        {/* FAQ Section */}
                        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-medium text-lg text-gray-900">What services are provided at your medical camps?</h3>
                                    <p className="mt-2 text-gray-600">Our medical camps offer a variety of services including general health checkups, specialized consultations, vaccinations, and health education sessions tailored to the needs of the community.</p>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-medium text-lg text-gray-900">How can I volunteer for a medical camp?</h3>
                                    <p className="mt-2 text-gray-600">We welcome healthcare professionals and general volunteers. Please fill out our volunteer form in the "Get Involved" section or contact us directly at volunteer@campswift.com.</p>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-medium text-lg text-gray-900">Are your medical camps free to attend?</h3>
                                    <p className="mt-2 text-gray-600">Many of our camps are free of charge, while some specialized camps may have nominal fees. Fee details are always clearly listed on each camp's registration page.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="bg-gray-900 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Stay updated with our upcoming medical camps, health tips, and community initiatives.
                    </p>
                    
                    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="px-4 py-3 rounded-lg flex-grow"
                            required
                        />
                        <button 
                            type="submit"
                            className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;


