import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaCampground, FaLocationArrow, FaCalendarAlt, FaUserMd, FaUsers, FaDollarSign, FaClipboardList, FaImage, FaMap, FaHospital } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Get image hosting key from environment variables
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Default image URL to use if upload fails
const DEFAULT_CAMP_IMAGE = "https://i.ibb.co/nPNPcsZ/medical-camp.webp";

const AddCamp = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isApiKeyMissing, setIsApiKeyMissing] = useState(!image_hosting_key);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // Handle image change for preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simple validation
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "Image too large",
                    text: "Please select an image less than 2MB"
                });
                e.target.value = "";
                setImagePreview(null);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = async (data) => {
        try {
            setUploadProgress(10);
            let imageUrl = DEFAULT_CAMP_IMAGE;
            
            // Only attempt to upload image if we have a valid API key
            if (image_hosting_key && data.image && data.image[0]) {
                try {
                    // First upload the image
                    const imageFile = { image: data.image[0] };
                    setUploadProgress(30);
    
                    const res = await axiosPublic.post(image_hosting_api, imageFile, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    });
                    
                    setUploadProgress(60);
    
                    if (res.data.success) {
                        imageUrl = res.data.data.display_url;
                    } else {
                        console.error("Image upload failed but continued with default image:", res.data);
                    }
                } catch (imageError) {
                    console.error("Image upload error:", imageError);
                    // Continue with default image
                    Swal.fire({
                        icon: "warning",
                        title: "Image Upload Failed",
                        text: "We'll use a default image for your camp. You can update it later.",
                        confirmButtonColor: "#FF6B35"
                    });
                }
            } else if (!image_hosting_key) {
                console.warn("API key for image upload is missing. Using default image.");
            }

            // Create specialized services and healthcare professionals arrays
            const specializedServicesArray = data.specializedServices.split(',').map(item => item.trim());
            const healthcareProfessionalsArray = data.healthcareProfessionals.split(',').map(item => item.trim());

            const campData = {
                campName: data.campName,
                image: imageUrl,
                campFees: parseFloat(data.campFees),
                healthcareProfessionals: healthcareProfessionalsArray,
                specializedServices: specializedServicesArray,
                targetAudience: data.targetAudience,
                venueLocation: data.venueLocation,
                purposeBenefits: data.purposeBenefits,
                scheduledDateTime: data.scheduledDateTime
            };

            setUploadProgress(80);
            const campRes = await axiosSecure.post('/camps', campData);
            setUploadProgress(100);

            if (campRes.data.insertedId) {
                reset();
                setImagePreview(null);
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Camp Added Successfully",
                    text: `${data.campName} has been added to your camps.`,
                    confirmButtonColor: "#FF6B35"
                });
            }
        } catch (error) {
            console.error("Error adding camp:", error);
            let errorMessage = "There was an error adding the camp. Please try again.";
            
            if (error.response) {
                console.error("Error response:", error.response.data);
                errorMessage = `Server error: ${error.response.status}. ${error.response.data.message || ""}`;
            } else if (error.request) {
                errorMessage = "No response from server. Please check your internet connection.";
            }
            
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: errorMessage
            });
        } finally {
            setUploadProgress(0);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-6xl mx-auto">
            <Helmet>
                <title>Dashboard | Add a Camp</title>
            </Helmet>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <FaCampground className="text-2xl text-primary" />
                    <h2 className="text-2xl font-bold text-gray-800">Add a New Medical Camp</h2>
                </div>
                <p className="text-gray-600">Complete the form below to create a new medical camp. All fields marked with an asterisk (*) are required.</p>
                
                {isApiKeyMissing && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                        <p className="font-medium">⚠️ Configuration Warning:</p>
                        <p>The image hosting API key is missing. The form will still work, but a default image will be used instead of your uploaded image.</p>
                        <p className="mt-2 text-xs">For developers: Set the VITE_IMAGE_HOSTING_KEY environment variable.</p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Progress bar for submission */}
                {uploadProgress > 0 && (
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                            {uploadProgress < 100 ? 'Processing...' : 'Complete!'}
                        </p>
                    </div>
                )}

                {/* Camp basic information section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FaHospital className="mr-2 text-primary" />
                        Basic Camp Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Camp Name */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Camp Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaCampground className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., Dental Health Camp"
                                    {...register("campName", { required: "Camp name is required" })}
                                />
                            </div>
                            {errors.campName && <p className="text-red-500 text-sm mt-1">{errors.campName.message}</p>}
                        </div>

                        {/* Camp Fees */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Camp Fees ($) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaDollarSign className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 25.00"
                                    step="0.01"
                                    min="0"
                                    {...register("campFees", { 
                                        required: "Camp fees are required",
                                        min: { value: 0, message: "Fees cannot be negative" }
                                    })}
                                />
                            </div>
                            {errors.campFees && <p className="text-red-500 text-sm mt-1">{errors.campFees.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Location and scheduling */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FaMap className="mr-2 text-primary" />
                        Location & Scheduling
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Venue Location */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Venue Location *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLocationArrow className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., City Community Center"
                                    {...register("venueLocation", { required: "Venue location is required" })}
                                />
                            </div>
                            {errors.venueLocation && <p className="text-red-500 text-sm mt-1">{errors.venueLocation.message}</p>}
                        </div>

                        {/* Scheduled Date Time */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Scheduled Date & Time *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaCalendarAlt className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., June 15, 2024 at 9:00 AM"
                                    {...register("scheduledDateTime", { required: "Schedule date and time are required" })}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Format: Month DD, YYYY at HH:MM AM/PM</p>
                            {errors.scheduledDateTime && <p className="text-red-500 text-sm mt-1">{errors.scheduledDateTime.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Services and professionals */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FaUserMd className="mr-2 text-primary" />
                        Services & Professionals
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Specialized Services */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Specialized Services *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaClipboardList className="text-gray-400" />
                                </div>
                                <textarea
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., Dental Checkup, Teeth Cleaning, Oral Hygiene Education"
                                    rows="3"
                                    {...register("specializedServices", { required: "Specialized services are required" })}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
                            {errors.specializedServices && <p className="text-red-500 text-sm mt-1">{errors.specializedServices.message}</p>}
                        </div>

                        {/* Healthcare Professionals */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Healthcare Professionals *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUserMd className="text-gray-400" />
                                </div>
                                <textarea
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., Dr. Jane Smith (Dentist), Dr. John Lee (Oral Surgeon)"
                                    rows="3"
                                    {...register("healthcareProfessionals", { required: "Healthcare professionals are required" })}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Separate multiple professionals with commas</p>
                            {errors.healthcareProfessionals && <p className="text-red-500 text-sm mt-1">{errors.healthcareProfessionals.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Audience and purpose */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FaUsers className="mr-2 text-primary" />
                        Audience & Purpose
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Audience */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Target Audience *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUsers className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., Children ages 5-12"
                                    {...register("targetAudience", { required: "Target audience is required" })}
                                />
                            </div>
                            {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>}
                        </div>

                        {/* Purpose and Benefits */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Purpose & Benefits *
                            </label>
                            <div className="relative">
                                <textarea
                                    className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Describe the purpose and benefits of this camp..."
                                    rows="3"
                                    {...register("purposeBenefits", { required: "Purpose and benefits are required" })}
                                />
                            </div>
                            {errors.purposeBenefits && <p className="text-red-500 text-sm mt-1">{errors.purposeBenefits.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Camp Image */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FaImage className="mr-2 text-primary" />
                        Camp Image
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Upload */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Upload Camp Image {!isApiKeyMissing ? '*' : '(Optional)'}
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="camp-image"
                                    onChange={handleImageChange}
                                    {...register("image", { 
                                        required: isApiKeyMissing ? false : "Camp image is required",
                                        onChange: handleImageChange
                                    })}
                                />
                                <label htmlFor="camp-image" className="cursor-pointer">
                                    {!imagePreview ? (
                                        <div className="space-y-2">
                                            <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="text-sm text-gray-600">
                                                <span className="text-primary font-medium">Click to upload</span> or drag and drop
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                            {isApiKeyMissing && (
                                                <p className="text-xs text-yellow-600 mt-2 font-medium">
                                                    Default image will be used due to missing API key
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <img 
                                                src={imagePreview} 
                                                alt="Camp preview" 
                                                className="mx-auto h-40 object-cover rounded-md"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                                                <p className="text-white text-sm font-medium">Change image</p>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
                        </div>

                        {/* Image Guidelines */}
                        <div className="col-span-1 flex items-center">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                                <h4 className="font-medium mb-2">Image Guidelines:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Use high-quality, relevant images</li>
                                    <li>Avoid copyright-protected images</li>
                                    <li>Optimal size: 1200x800 pixels</li>
                                    <li>Maximum file size: 2MB</li>
                                    <li>Supported formats: JPG, PNG, GIF</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form submission */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        disabled={isSubmitting}
                    >
                        Reset Form
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Camp...
                            </>
                        ) : (
                            <>
                                <FaCampground className="mr-2" />
                                Create Camp
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCamp;