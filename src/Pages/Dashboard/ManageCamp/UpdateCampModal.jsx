import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaLocationArrow, FaUsers, FaUserMd, FaDollarSign, FaCampground, FaTimes } from "react-icons/fa";

const UpdateCampModal = ({ isOpen, onClose, campDetails, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set initial form data when the campDetails prop changes
    if (campDetails) {
      // Convert array fields to comma-separated strings for editing
      const formattedData = {
        ...campDetails,
        specializedServices: Array.isArray(campDetails.specializedServices) 
          ? campDetails.specializedServices.join(', ') 
          : campDetails.specializedServices,
        healthcareProfessionals: Array.isArray(campDetails.healthcareProfessionals) 
          ? campDetails.healthcareProfessionals.join(', ') 
          : campDetails.healthcareProfessionals
      };
      setFormData(formattedData);
    }
  }, [campDetails]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.campName?.trim()) {
      newErrors.campName = "Camp name is required";
    }
    
    if (!formData.venueLocation?.trim()) {
      newErrors.venueLocation = "Venue location is required";
    }
    
    if (!formData.scheduledDateTime?.trim()) {
      newErrors.scheduledDateTime = "Date and time are required";
    }
    
    if (!formData.targetAudience?.trim()) {
      newErrors.targetAudience = "Target audience is required";
    }
    
    if (!formData.specializedServices?.trim()) {
      newErrors.specializedServices = "At least one service is required";
    }
    
    if (!formData.healthcareProfessionals?.trim()) {
      newErrors.healthcareProfessionals = "At least one healthcare professional is required";
    }
    
    if (!formData.purposeBenefits?.trim()) {
      newErrors.purposeBenefits = "Purpose and benefits are required";
    }
    
    if (isNaN(formData.campFees) || formData.campFees < 0) {
      newErrors.campFees = "Camp fees must be a valid number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For camp fees, parse the value to a number if possible
    const processedValue = name === 'campFees' ? 
      (value === '' ? '' : parseFloat(value)) : 
      value;
    
    // Update form data as the user types
    setFormData({
      ...formData,
      [name]: processedValue,
    });
    
    // Clear the error for this field when the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Process data before updating (convert strings back to arrays)
    const processedData = {
      ...formData,
      specializedServices: formData.specializedServices.split(',').map(item => item.trim()),
      healthcareProfessionals: formData.healthcareProfessionals.split(',').map(item => item.trim()),
      campFees: parseFloat(formData.campFees)
    };
    
    // Send update request to the server
    onUpdate(processedData)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error updating camp:", error);
        // Could display an error message here
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaCampground className="mr-2 text-primary" />
              Update Camp: {formData.campName}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Camp Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Name */}
              <div>
                <label htmlFor="campName" className="block text-sm font-medium text-gray-700 mb-1">
                  Camp Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCampground className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="campName"
                    name="campName"
                    value={formData.campName || ''}
                    onChange={handleChange}
                    className={`pl-10 w-full py-3 px-4 bg-white border ${errors.campName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="e.g., Dental Health Camp"
                  />
                </div>
                {errors.campName && <p className="text-red-500 text-sm mt-1">{errors.campName}</p>}
              </div>
              
              {/* Camp Fees */}
              <div>
                <label htmlFor="campFees" className="block text-sm font-medium text-gray-700 mb-1">
                  Camp Fees ($) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="campFees"
                    name="campFees"
                    value={formData.campFees || ''}
                    onChange={handleChange}
                    className={`pl-10 w-full py-3 px-4 bg-white border ${errors.campFees ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="e.g., 25.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {errors.campFees && <p className="text-red-500 text-sm mt-1">{errors.campFees}</p>}
              </div>
              
              {/* Venue Location */}
              <div>
                <label htmlFor="venueLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLocationArrow className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="venueLocation"
                    name="venueLocation"
                    value={formData.venueLocation || ''}
                    onChange={handleChange}
                    className={`pl-10 w-full py-3 px-4 bg-white border ${errors.venueLocation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="e.g., City Community Center"
                  />
                </div>
                {errors.venueLocation && <p className="text-red-500 text-sm mt-1">{errors.venueLocation}</p>}
              </div>
              
              {/* Scheduled Date Time */}
              <div>
                <label htmlFor="scheduledDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date & Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="scheduledDateTime"
                    name="scheduledDateTime"
                    value={formData.scheduledDateTime || ''}
                    onChange={handleChange}
                    className={`pl-10 w-full py-3 px-4 bg-white border ${errors.scheduledDateTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="e.g., June 15, 2024 at 9:00 AM"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Format: Month DD, YYYY at HH:MM AM/PM</p>
                {errors.scheduledDateTime && <p className="text-red-500 text-sm mt-1">{errors.scheduledDateTime}</p>}
              </div>
              
              {/* Target Audience */}
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUsers className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience || ''}
                    onChange={handleChange}
                    className={`pl-10 w-full py-3 px-4 bg-white border ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="e.g., Children ages 5-12"
                  />
                </div>
                {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
              </div>
            </div>
            
            {/* Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialized Services */}
              <div>
                <label htmlFor="specializedServices" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialized Services *
                </label>
                <textarea
                  id="specializedServices"
                  name="specializedServices"
                  value={formData.specializedServices || ''}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 bg-white border ${errors.specializedServices ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                  placeholder="e.g., Dental Checkup, Teeth Cleaning, Oral Hygiene Education"
                  rows="3"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
                {errors.specializedServices && <p className="text-red-500 text-sm mt-1">{errors.specializedServices}</p>}
              </div>
              
              {/* Healthcare Professionals */}
              <div>
                <label htmlFor="healthcareProfessionals" className="block text-sm font-medium text-gray-700 mb-1">
                  Healthcare Professionals *
                </label>
                <textarea
                  id="healthcareProfessionals"
                  name="healthcareProfessionals"
                  value={formData.healthcareProfessionals || ''}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 bg-white border ${errors.healthcareProfessionals ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                  placeholder="e.g., Dr. Jane Smith (Dentist), Dr. John Lee (Oral Surgeon)"
                  rows="3"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Separate multiple professionals with commas</p>
                {errors.healthcareProfessionals && <p className="text-red-500 text-sm mt-1">{errors.healthcareProfessionals}</p>}
              </div>
              
              {/* Purpose and Benefits */}
              <div className="md:col-span-2">
                <label htmlFor="purposeBenefits" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose & Benefits *
                </label>
                <textarea
                  id="purposeBenefits"
                  name="purposeBenefits"
                  value={formData.purposeBenefits || ''}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 bg-white border ${errors.purposeBenefits ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                  placeholder="Describe the purpose and benefits of this camp..."
                  rows="3"
                ></textarea>
                {errors.purposeBenefits && <p className="text-red-500 text-sm mt-1">{errors.purposeBenefits}</p>}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancel
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
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateCampModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  campDetails: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
};

export default UpdateCampModal;
