import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img 
                                className="w-10 h-10 object-contain" 
                                src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                                alt="CampSwift Logo" 
                            />
                            <span className="font-bold text-xl text-white">CampSwift</span>
                        </div>
                        <p className="text-gray-400 mt-4">
                            Empowering communities through accessible healthcare services with a mission to provide quality medical care to everyone.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary/20 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors duration-300">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-primary/20 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors duration-300">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary/20 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors duration-300">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-primary/20 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors duration-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-primary after:-mb-2">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                    <FaArrowRight className="mr-2 text-xs" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/availableCamps" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                    <FaArrowRight className="mr-2 text-xs" />
                                    <span>Available Camps</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                    <FaArrowRight className="mr-2 text-xs" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contactUs" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                    <FaArrowRight className="mr-2 text-xs" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-primary after:-mb-2">Our Services</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                <FaArrowRight className="mr-2 text-xs" />
                                <span>General Health Checkups</span>
                            </li>
                            <li className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                <FaArrowRight className="mr-2 text-xs" />
                                <span>Specialized Care</span>
                            </li>
                            <li className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                <FaArrowRight className="mr-2 text-xs" />
                                <span>Health Education</span>
                            </li>
                            <li className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                <FaArrowRight className="mr-2 text-xs" />
                                <span>Community Outreach</span>
                            </li>
                            <li className="text-gray-400 hover:text-primary transition-colors inline-flex items-center">
                                <FaArrowRight className="mr-2 text-xs" />
                                <span>Emergency Services</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-primary after:-mb-2">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <div className="text-primary mt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <span className="text-gray-400">
                                    123 Health Street, Medical City<br />
                                    New York, NY 10001
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="text-primary">
                                    <FaPhoneAlt />
                                </div>
                                <span className="text-gray-400">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="text-primary">
                                    <FaEnvelope />
                                </div>
                                <span className="text-gray-400">
                                    info@campswift.com
                                </span>
                            </li>
                        </ul>
                        
                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="p-2 text-sm bg-gray-800 text-white rounded-l-md focus:outline-none flex-grow"
                                />
                                <button className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark transition-colors">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} CampSwift. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy-policy" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</Link>
                            <Link to="/sitemap" className="text-gray-500 hover:text-primary text-sm transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;