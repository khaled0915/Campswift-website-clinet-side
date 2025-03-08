import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log(error));
    };

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const closeOffcanvas = () => {
        setIsOffcanvasOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active-nav-link' : '';
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Available Camps', path: '/availableCamps' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Contact Us', path: '/contactUs' }
    ];

    return (
        <>
            {/* Main Navbar */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img 
                                className="w-10 h-10 md:w-12 md:h-12 object-contain" 
                                src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                                alt="CampSwift Logo" 
                            />
                            <span className={`font-bold text-xl md:text-2xl ${scrolled ? 'text-primary' : 'text-primary'}`}>
                                CampSwift
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center">
                            <ul className="flex space-x-8">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={item.path}
                                            className={`relative font-medium ${scrolled ? 'text-gray-800' : 'text-gray-800'} hover:text-primary transition-colors duration-300 py-2 px-1 ${isActive(item.path)}`}
                                        >
                                            {item.name}
                                            <span className="absolute left-0 bottom-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* User section - Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} className="cursor-pointer">
                                            {user.photoURL ? (
                                                <img 
                                                    src={user.photoURL} 
                                                    alt={user.displayName || "User"} 
                                                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                                    {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                                                </div>
                                            )}
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52 mt-2">
                                            <li className="py-2 px-4 text-center font-medium text-gray-600">
                                                {user.displayName || user.email}
                                            </li>
                                            <div className="divider my-0"></div>
                                            <li>
                                                <Link to="/dashboard" className="py-2 hover:bg-gray-100 transition-colors">
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={handleLogOut}
                                                    className="py-2 text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="btn btn-primary px-6 shadow-md">
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={toggleOffcanvas}
                            className="lg:hidden flex items-center text-gray-800 p-2 focus:outline-none"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-gray-800'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Offcanvas Menu for Mobile */}
            <div className={`fixed top-0 right-0 z-[60] h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOffcanvasOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <div className="flex items-center gap-2">
                            <img 
                                className="w-8 h-8 object-contain" 
                                src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                                alt="CampSwift Logo" 
                            />
                            <span className="font-bold text-xl text-primary">CampSwift</span>
                        </div>
                        <button 
                            onClick={closeOffcanvas}
                            className="p-2 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <Link 
                                    key={index}
                                    to={item.path}
                                    onClick={closeOffcanvas}
                                    className={`py-3 px-4 rounded-lg font-medium transition-colors hover:bg-gray-100 ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* User Section - Mobile */}
                    <div className="border-t px-6 py-4">
                        {user ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 mb-3">
                                    {user.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt={user.displayName || "User"} 
                                            className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                            {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                                        </div>
                                    )}
                                    <div className="text-sm">
                                        <p className="font-medium">{user.displayName || "User"}</p>
                                        <p className="text-gray-500 text-xs truncate max-w-[180px]">{user.email}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        handleLogOut();
                                        closeOffcanvas();
                                    }}
                                    className="w-full btn btn-outline btn-error"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={closeOffcanvas}
                                className="w-full btn btn-primary"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for Offcanvas */}
            {isOffcanvasOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={closeOffcanvas}
                ></div>
            )}

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>
        </>
    );
};

export default Navbar;
    
/* Add these styles to your global CSS file or create a new CSS module */
/* src/index.css or a new file like Navbar.module.css */
/*
.active-nav-link {
    color: theme('colors.primary.DEFAULT');
    position: relative;
}

.active-nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background-color: theme('colors.primary.DEFAULT');
}
*/