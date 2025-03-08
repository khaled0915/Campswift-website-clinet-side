import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHeartbeat, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../Firebase/firebase.config";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const testEmail = "test@example.com";
    const testPassword = "Test123!";
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const auth = getAuth(app);

    // Helper function to create a test user
    const createTestUser = async () => {
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, testEmail, testPassword);
            Swal.fire({
                title: "Test Account Created!",
                text: `Email: ${testEmail}\nPassword: ${testPassword}\n\nYou can now log in with these credentials.`,
                icon: "success",
                confirmButtonColor: "#FF6B35",
            });
            // Auto-fill the login form with test credentials
            document.getElementById("email").value = testEmail;
            document.getElementById("password").value = testPassword;
        } catch (error) {
            console.error("Error creating test user:", error.code, error.message);
            let errorMessage = "Failed to create test user.";
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Test account already exists. You can try logging in with it.";
                // Auto-fill the login form with test credentials
                document.getElementById("email").value = testEmail;
                document.getElementById("password").value = testPassword;
            }
            
            Swal.fire({
                icon: "info",
                title: "Test Account",
                text: errorMessage,
                confirmButtonColor: "#FF6B35",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = event => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // Add validation
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Please provide both email and password.",
                confirmButtonColor: "#FF6B35",
            });
            setIsLoading(false);
            return;
        }

        console.log("Attempting to sign in with:", email);
        
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log("Login successful:", user);

                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome back to CampSwift",
                    icon: "success",
                    confirmButtonColor: "#FF6B35",
                });

                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Firebase auth error:", error.code, error.message);
                
                let errorMessage = "Invalid email or password. Please try again.";
                
                // Provide more specific error messages based on Firebase error codes
                if (error.code === 'auth/user-not-found') {
                    errorMessage = "No account exists with this email. Please sign up.";
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = "Incorrect password. Please try again.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Invalid email format. Please check your email.";
                } else if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid login credentials. Please check your email and password.";
                } else if (error.code === 'auth/invalid-login-credentials') {
                    errorMessage = "The email or password you entered doesn't match our records. Please try again or create a new account.";
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = "Too many failed login attempts. Please try again later.";
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = "Network error. Please check your internet connection.";
                }
                
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: errorMessage,
                    confirmButtonColor: "#FF6B35",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Helmet>
                <title>CampSwift | Login</title>
            </Helmet>

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left side - New design */}
                        <div className="hidden md:block bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
                            {/* Background decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
                                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white opacity-10"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white opacity-5"></div>
                            </div>
                            
                            <div className="relative z-10 flex flex-col h-full p-12">
                                {/* Logo and branding */}
                                <div className="mb-16">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <img 
                                                src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                                                alt="CampSwift Logo" 
                                                className="w-8 h-8 object-contain"
                                            />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">CampSwift</h1>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Welcome to CampSwift</h2>
                                    <p className="text-white/80">Sign in to access your account and manage your healthcare services.</p>
                                </div>
                                
                                {/* Features */}
                                <div className="space-y-6 mb-auto">
                                    <div className="flex items-start">
                                        <div className="bg-white/20 p-3 rounded-full mr-4 shrink-0">
                                            <FaHeartbeat className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-1">Healthcare Excellence</h3>
                                            <p className="text-white/70">Access top-quality medical services from our network of professionals.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="bg-white/20 p-3 rounded-full mr-4 shrink-0">
                                            <FaUserMd className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-1">Expert Physicians</h3>
                                            <p className="text-white/70">Connect with experienced doctors specialized in various medical fields.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="bg-white/20 p-3 rounded-full mr-4 shrink-0">
                                            <FaCalendarCheck className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-1">Easy Appointments</h3>
                                            <p className="text-white/70">Schedule and manage your medical camp appointments seamlessly.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Testimonial */}
                                <div className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                    <p className="italic text-white/90 mb-4">
                                        &ldquo;CampSwift has revolutionized how we deliver healthcare to underserved communities. It&apos;s an essential platform for modern healthcare providers.&rdquo;
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                                        <div>
                                            <p className="font-semibold">Dr. Sarah Johnson</p>
                                            <p className="text-sm text-white/70">Medical Director</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Login Form */}
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="flex items-center gap-2 mb-8">
                                <img 
                                    className="w-10 h-10 object-contain" 
                                    src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                                    alt="CampSwift Logo" 
                                />
                                <span className="font-bold text-xl text-gray-800">CampSwift</span>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Sign In</h3>
                            <p className="text-gray-600 mb-8">Please sign in to continue to your account</p>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="example@email.com" 
                                            className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            id="password" 
                                            name="password" 
                                            placeholder="••••••••" 
                                            className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required 
                                        />
                                        <button 
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="text-gray-400" />
                                            ) : (
                                                <FaEye className="text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full btn bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg transition-colors font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <SocialLogin />
                                </div>
                            </div>

                            <p className="mt-8 text-center text-gray-600">
                                Don&apos;t have an account?{" "}
                                <Link to="/SignUp" className="text-primary font-medium hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;