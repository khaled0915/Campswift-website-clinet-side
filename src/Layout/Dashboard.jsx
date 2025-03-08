import { useState, useEffect } from 'react';
import { 
  FaCampground, 
  FaHome,  
  FaRegBookmark, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaUserMd, 
  FaUsers, 
  FaPlus, 
  FaCogs, 
  FaHistory, 
  FaStar, 
  FaChartLine, 
  FaClipboardCheck,
  FaSearch,
  FaBell,
  FaQuestion,
  FaCog,
  FaCalendarAlt
} from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useOrganizer from "../hooks/useOrganizer";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [isOrganizer] = useOrganizer();
  const { user, logOut } = useAuth() || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  // Check if mobile and handle sidebar state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    
    // Set page title based on location
    const path = location.pathname.split('/').pop();
    setPageTitle(path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    
    // Close menus when route changes
    setSearchOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  // Get the current active page name
  const getPageTitle = () => {
    return pageTitle || 'Dashboard';
  };

  // Sample notifications data
  const notifications = [
    { id: 1, title: "New registration", message: "A new participant has registered for Medical Camp", time: "10 min ago", isRead: false },
    { id: 2, title: "Camp update", message: "Dental Care Camp has been updated", time: "1 hour ago", isRead: false },
    { id: 3, title: "Payment received", message: "Payment received for Eye Care Camp", time: "2 hours ago", isRead: true }
  ];

  return (
    <div className="relative flex h-screen bg-gray-50 overflow-hidden">
      <Helmet>
        <title>CampSwift | {getPageTitle()}</title>
      </Helmet>

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-20 ${isOrganizer ? 'bg-white border-b' : 'bg-blue-600'} ${isOrganizer ? 'text-gray-800' : 'text-white'} shadow-sm`}>
        <div className="flex items-center justify-between p-4">
          <button onClick={toggleSidebar} className={`p-2 rounded-lg ${isOrganizer ? 'hover:bg-gray-100' : 'hover:bg-blue-700'}`}>
            {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
          
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
              alt="CampSwift" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-lg">CampSwift</span>
          </div>
          
          <div className="relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/nPNPcsZ/medical-camp.webp"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-800">{user?.displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FaSignOutAlt />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Breadcrumb */}
        <div className={`px-4 py-2 text-sm ${isOrganizer ? 'bg-gray-50 text-gray-600' : 'bg-blue-700 text-white/80'}`}>
          <div className="flex items-center">
            <span>Dashboard</span>
            <span className="mx-2">›</span>
            <span className="font-medium">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay (mobile only) */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-30 transition-transform duration-300 ease-in-out flex flex-col h-full ${
          isOrganizer ? 'bg-white text-gray-800 shadow-lg' : 'bg-blue-900 text-white'
        } shadow-xl`}
        style={{ width: '280px' }}
      >
        {/* Logo & Branding */}
        <div className={`p-5 ${isOrganizer ? 'bg-gray-100' : 'bg-blue-800'} flex items-center gap-3`}>
          <img 
            src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
            alt="CampSwift" 
            className="w-10 h-10 rounded-md"
          />
          <div>
            <h1 className="text-xl font-bold">CampSwift</h1>
            <p className={`text-xs ${isOrganizer ? 'text-gray-500' : 'opacity-80'}`}>{isOrganizer ? 'Organizer Dashboard' : 'User Dashboard'}</p>
          </div>
        </div>

        {/* User Profile Section */}
        <div className={`p-5 ${isOrganizer ? 'bg-gray-50 border-b border-gray-200' : 'bg-blue-700 border-b border-white/10'} flex items-center gap-4`}>
          <div className="relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/nPNPcsZ/medical-camp.webp"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="font-medium">{user?.displayName || 'User'}</p>
            <p className={`text-xs ${isOrganizer ? 'text-gray-500' : 'opacity-80'}`}>{isOrganizer ? 'Camp Organizer' : 'Participant'}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <p className={`text-xs font-semibold px-3 uppercase tracking-wider mb-2 ${isOrganizer ? 'text-gray-500' : 'text-white/50'}`}>Main Menu</p>
          <ul className="space-y-2">
            {isOrganizer ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/organizer-profile"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaUserMd className="text-lg" />
                    <span>Organizer Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-a-camp"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaPlus className="text-lg" />
                    <span>Add Camp</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-camps"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaCogs className="text-lg" />
                    <span>Manage Camps</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-registered-camps"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaClipboardCheck className="text-lg" />
                    <span>Registered Camps</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaUsers className="text-lg" />
                    <span>All Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <FaChartLine className="text-lg" />
                    <span>Analytics</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/participant-profile"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-white text-blue-600 font-medium' 
                        : 'text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <FaUser className="text-lg" />
                    <span>My Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/registered-camps"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-white text-blue-600 font-medium' 
                        : 'text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <FaRegBookmark className="text-lg" />
                    <span>Registered Camps</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-white text-blue-600 font-medium' 
                        : 'text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <FaHistory className="text-lg" />
                    <span>Payment History</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/feedback-and-ratings"
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-white text-blue-600 font-medium' 
                        : 'text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <FaStar className="text-lg" />
                    <span>Feedback & Ratings</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className={`border-t my-4 ${isOrganizer ? 'border-gray-200' : 'border-white/10'}`}></div>
          <p className={`text-xs font-semibold px-3 uppercase tracking-wider mb-2 ${isOrganizer ? 'text-gray-500' : 'text-white/50'}`}>Navigation</p>
          
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                    ? (isOrganizer ? 'bg-primary text-white font-medium' : 'bg-white text-blue-600 font-medium')
                    : (isOrganizer ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')
                  }`
                }
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/availableCamps"
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                    ? (isOrganizer ? 'bg-primary text-white font-medium' : 'bg-white text-blue-600 font-medium')
                    : (isOrganizer ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')
                  }`
                }
              >
                <FaCampground className="text-lg" />
                <span>Available Camps</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className={`p-4 ${isOrganizer ? 'border-t border-gray-200' : 'border-t border-white/10'}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors ${
              isOrganizer 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            <FaSignOutAlt className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:block border-b bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left side - Breadcrumb and search */}
            <div className="flex items-center">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-600">
                <span>Dashboard</span>
                <span className="mx-2 text-gray-400">›</span>
                <span className="font-medium text-gray-900">{getPageTitle()}</span>
              </div>
              
              {/* Search */}
              <div className="relative ml-6">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <FaSearch className="text-lg" />
                </button>
                
                {searchOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border overflow-hidden z-50">
                    <div className="p-2">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <FaSearch className="absolute left-2.5 top-3 text-gray-400" />
                      </div>
                      <div className="mt-2 text-xs text-gray-500 p-2">
                        <p>Recent searches:</p>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer">
                            <span>Dental Camp</span>
                          </div>
                          <div className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer">
                            <span>Medical Registration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side - User actions */}
            <div className="flex items-center gap-3">
              {/* Calendar button */}
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hidden md:flex">
                <FaCalendarAlt />
              </button>
              
              {/* Help button */}
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hidden md:flex">
                <FaQuestion />
              </button>
              
              {/* Settings button */}
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hidden md:flex">
                <FaCog />
              </button>
              
              {/* Notifications dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <FaBell />
                  {notifications.some(n => !n.isRead) && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border overflow-hidden z-50">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-xs text-primary hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-t">
                      <button className="text-sm text-primary hover:underline">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/nPNPcsZ/medical-camp.webp"}
                    alt={user?.displayName || "User"}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-medium text-sm text-gray-800 mr-1 hidden md:inline-block">{user?.displayName?.split(' ')[0]}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border overflow-hidden z-50">
                    <div className="p-4 border-b">
                      <p className="font-medium text-gray-800">{user?.displayName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <div className="mt-2 pt-2 border-t">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {isOrganizer ? 'Organizer' : 'Participant'}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <NavLink 
                        to={isOrganizer ? "/dashboard/organizer-profile" : "/dashboard/participant-profile"} 
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                      >
                        <FaUser className="text-gray-500" />
                        <span>My Profile</span>
                      </NavLink>
                      <NavLink 
                        to="/dashboard/settings" 
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                      >
                        <FaCog className="text-gray-500" />
                        <span>Settings</span>
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                      >
                        <FaSignOutAlt className="text-gray-500" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Page title and actions bar */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500">Manage your medical camp activities and information</p>
            </div>
            
            {/* Action buttons specific to current page */}
            <div className="flex gap-3">
              {isOrganizer && pageTitle === "Add Camp" && (
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 shadow-sm">
                  <FaPlus className="text-sm" />
                  <span>Create Camp</span>
                </button>
              )}
              
              {isOrganizer && pageTitle === "Manage Camps" && (
                <>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center gap-2 shadow-sm hover:bg-gray-50">
                    <FaRegBookmark className="text-sm" />
                    <span>Save Report</span>
                  </button>
                  <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 shadow-sm">
                    <FaPlus className="text-sm" />
                    <span>Add New Camp</span>
                  </button>
                </>
              )}
              
              {!isOrganizer && pageTitle === "Registered Camps" && (
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 shadow-sm">
                  <FaRegBookmark className="text-sm" />
                  <span>Find New Camps</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 mt-16 lg:mt-0 bg-gray-50">
          {/* Content container with max width */}
          <div className="max-w-7xl mx-auto">
            {/* Quick stats cards for organizer dashboard, visible only on larger pages */}
            {isOrganizer && pageTitle === "Dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <FaCampground />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Camps</p>
                      <p className="text-2xl font-semibold">24</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-600 flex items-center">
                    <span>↑ 12% from last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <FaUsers />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Participants</p>
                      <p className="text-2xl font-semibold">154</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-600 flex items-center">
                    <span>↑ 18% from last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Camps</p>
                      <p className="text-2xl font-semibold">7</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-yellow-600 flex items-center">
                    <span>Same as last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                      <FaStar />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Rating</p>
                      <p className="text-2xl font-semibold">4.8/5</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-600 flex items-center">
                    <span>↑ 0.2 from last month</span>
                  </div>
                </div>
              </div>
            )}
            
            <Outlet />
            
            {/* Additional info that would be shown on certain pages */}
            {pageTitle === "Manage Camps" && isOrganizer && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Tips for Managing Camps</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
                  <p>• Keep your camp information up to date to attract more participants</p>
                  <p>• Add clear images and detailed descriptions for better visibility</p>
                  <p>• Regularly update camp schedules and professional information</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;