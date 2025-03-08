import { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaImage, FaUpload, FaCheck } from "react-icons/fa";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../Firebase/firebase.config";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const storage = getStorage(app);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // This allows us to watch the password field for confirmation matching
  const password = watch("password", "");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Please select an image less than 2MB",
          confirmButtonColor: "#FF6B35",
        });
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // Check file type
      if (!file.type.match('image.*')) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please select an image file (JPEG, PNG, etc.)",
          confirmButtonColor: "#FF6B35",
        });
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      try {
        console.log(`Starting image upload for: ${file.name}`);
        const storageRef = ref(storage, `profile-images/${Date.now()}-${file.name}`);
        console.log('Storage reference created');
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('Upload task created');

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log(`Upload progress: ${progress.toFixed(2)}%`);
          },
          (error) => {
            // Handle upload errors
            console.error("Firebase storage error:", error.code, error.message);
            console.error("Full error:", error);
            reject(error);
          },
          () => {
            // Upload completed successfully, get download URL
            console.log("Upload complete, getting download URL");
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                console.log("Download URL obtained:", downloadURL);
                resolve(downloadURL);
              })
              .catch(error => {
                console.error("Error getting download URL:", error);
                reject(error);
              });
          }
        );
      } catch (error) {
        console.error("Error setting up upload:", error);
        reject(error);
      }
    });
  };

  // Function to get a default avatar URL
  const getDefaultAvatarUrl = () => {
    // Return a placeholder image URL
    return "https://i.ibb.co/nPNPcsZ/medical-camp.webp"; // Use your app logo as fallback
  };

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", {
      ...data,
      password: "[REDACTED]",
    });
    
    setIsLoading(true);
    let photoURL = "";
    
    try {
      // If an image was selected, try to upload it
      if (imageFile) {
        console.log("Image file selected, attempting upload...");
        try {
          photoURL = await uploadImage(imageFile);
          console.log("Image upload successful:", photoURL);
        } catch (error) {
          console.error("Image upload failed:", error);
          
          // If we get a CORS error, use a default avatar instead
          if (error.code === 'storage/unauthorized' || error.message?.includes('CORS')) {
            console.log("CORS issue detected, using default avatar instead");
            Swal.fire({
              icon: "warning",
              title: "Image Upload Failed",
              text: "We couldn't upload your profile image due to security restrictions. We'll use a default avatar for now.",
              confirmButtonColor: "#FF6B35",
            });
            photoURL = getDefaultAvatarUrl();
          } else {
            // For other errors, show a message but continue with signup
            Swal.fire({
              icon: "warning",
              title: "Image Upload Failed",
              text: "There was a problem uploading your profile image. We'll continue without it.",
              confirmButtonColor: "#FF6B35",
            });
          }
        }
      } else {
        // If no image was selected, use a default avatar
        photoURL = getDefaultAvatarUrl();
        console.log("No image selected, using default avatar");
      }

      // Proceed with user creation
      console.log("Creating user account...");
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log("User created successfully:", loggedUser.uid);
      
      // Update user profile with name and photo URL
      console.log("Updating user profile...");
      await updateUserProfile(data.name, photoURL);
      console.log("Profile updated successfully");
      
      // Save user info to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: photoURL,
      };

      console.log("Saving user to database...");
      const res = await axiosPublic.post('/users', userInfo);
      console.log("Database response:", res.data);
      
      if (res.data.insertedId) {
        console.log('User added to the database');
        reset();
        
        Swal.fire({
          title: "Account Created!",
          text: "Your account has been successfully created.",
          icon: "success",
          confirmButtonColor: "#FF6B35",
        });

        navigate('/');
      } else {
        console.log("No insertedId in response:", res.data);
        Swal.fire({
          icon: "warning",
          title: "Partial Success",
          text: "Your account was created but we couldn't save all your information. You can update your profile later.",
          confirmButtonColor: "#FF6B35",
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      
      let errorMessage = "There was an error creating your account.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please log in or use a different email.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Your password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format. Please enter a valid email address.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: errorMessage,
        confirmButtonColor: "#FF6B35",
      });
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>CampSwift | Sign Up</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Features */}
            <div className="hidden md:block relative bg-white overflow-hidden">
              {/* Main background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-primary z-0"></div>
              
              {/* Decorative wave pattern */}
              <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white/10 fill-current">
                  <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
              
              {/* Medical-themed illustration */}
              <div className="absolute -right-24 -top-24 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
              <div className="absolute right-20 top-20 w-10 h-10 bg-primary rounded-full opacity-40"></div>
              <div className="absolute bottom-40 left-10 w-16 h-16 bg-primary rounded-full opacity-30"></div>
              
              <div className="relative z-10 flex flex-col justify-between h-full p-12">
                {/* Top section with logo */}
                <div>
                  <div className="flex items-center mb-16">
                    <div className="bg-white rounded-2xl p-3 shadow-lg">
                      <img 
                        src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                        alt="CampSwift Logo" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className="text-2xl font-bold text-white">CampSwift</h1>
                      <p className="text-white/70 text-sm">Healthcare Management</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                    Start Your <span className="text-yellow-300">Healthcare</span> Journey Today
                  </h2>
                  
                  <p className="text-white/80 text-lg mb-8 max-w-md">
                    Join thousands of patients who trust CampSwift for their healthcare management needs.
                  </p>
                </div>
                
                {/* Middle section with stats */}
                <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-3xl font-bold text-white mb-1">50+</div>
                    <div className="text-white/70">Medical Camps</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-3xl font-bold text-white mb-1">10K+</div>
                    <div className="text-white/70">Registered Users</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-white/70">Support Service</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-white/70">Health Professionals</div>
                  </div>
                </div>
                
                {/* Bottom section with testimonial */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                        J
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-white/90 italic text-sm mb-3">
                        &ldquo;CampSwift has transformed how I manage healthcare for my family. The platform is intuitive, the medical camps are well-organized, and the staff are incredibly professional.&rdquo;
                      </p>
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium text-white text-sm">James Wilson</p>
                          <p className="text-white/60 text-xs">Patient since 2022</p>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-300">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Sign Up Form */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-2 mb-8">
                <img 
                  className="w-10 h-10 object-contain" 
                  src="https://i.ibb.co/nPNPcsZ/medical-camp.webp" 
                  alt="CampSwift Logo" 
                />
                <span className="font-bold text-xl text-gray-800">CampSwift</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
              <p className="text-gray-600 mb-8">Please fill in your information to create an account</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Your Name" 
                      className={`pl-10 block w-full rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-300'} py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                      {...register("name", { required: true })}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                </div>

                {/* Photo Upload Field */}
                <div className="space-y-2">
                  <label htmlFor="photo" className="text-sm font-medium text-gray-700 block">Profile Photo</label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 transition-all ${imagePreview ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 bg-gray-50'}`}
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-3">
                          <img 
                            src={imagePreview} 
                            alt="Profile Preview" 
                            className="w-32 h-32 rounded-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">Click to change image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <FaImage className="text-gray-400 text-4xl mb-2" />
                        <p className="text-sm text-gray-500 text-center mb-1">Click to upload your profile photo</p>
                        <p className="text-xs text-gray-400 text-center">JPG, PNG, GIF (Max 2MB)</p>
                      </div>
                    )}
                    
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      id="photo" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    
                    <div className="mt-3 flex justify-center">
                      <label 
                        htmlFor="photo"
                        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <FaUpload className="mr-2" />
                        {imagePreview ? 'Change Photo' : 'Select Photo'}
                      </label>
                    </div>
                    
                    {/* Upload progress bar */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="w-full mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-center mt-1 text-gray-500">Uploading: {Math.round(uploadProgress)}%</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="example@email.com" 
                      className={`pl-10 block w-full rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      placeholder="••••••••" 
                      className={`pl-10 block w-full rounded-lg border ${errors.password ? 'border-red-300' : 'border-gray-300'} py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                      {...register("password", { 
                        required: true, 
                        minLength: 6, 
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ 
                      })}
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
                  {errors.password?.type === 'required' && (
                    <p className="text-red-500 text-sm mt-1">Password is required</p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
                  )}
                  {errors.password?.type === 'pattern' && (
                    <p className="text-red-500 text-sm mt-1">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCheck className="text-gray-400" />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirmPassword" 
                      placeholder="••••••••" 
                      className={`pl-10 block w-full rounded-lg border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                      {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Password requirements hint */}
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-700 mb-1">Password must contain:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 6 characters</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one number (0-9)</li>
                    <li>At least one special character (!@#$&*)</li>
                  </ul>
                </div>

                <button 
                  type="submit" 
                  className="w-full btn bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg transition-colors font-medium mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Optional Image Upload Notice */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Note: Image upload may not work in development mode due to CORS restrictions. Your account will still be created.
                </p>
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
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;