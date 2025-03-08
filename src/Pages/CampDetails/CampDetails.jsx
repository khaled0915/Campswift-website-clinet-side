import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useCamp from "../../hooks/useCamp";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useOrganizer from "../../hooks/useOrganizer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUserMd, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const CampDetails = () => {
  const [isOrganizer] = useOrganizer();
  const { user } = useAuth();
  const [camp, , refetch] = useCamp();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const handleJoinCamp = event => {
    console.log(user?.email);

    if (user && user.email) {
      event.preventDefault();
      const form = event.target;
      
      const name = form.name.value;
      const age = form.age.value;
      const phone = form.phone.value;
      const address = form.address.value;
      const emergency_contact = form.emergency_contact.value;
      const gender = form.gender.value;

      const participantInfo = {
        campId: filteredCamp._id,
        email: user.email,
        campName: filteredCamp.campName,
        campFees: filteredCamp.campFees,
        image: filteredCamp.image,
        specializedServices: filteredCamp.specializedServices,
        targetAudience: filteredCamp.targetAudience,
        venueLocation: filteredCamp.venueLocation,
        purposeBenefits: filteredCamp.purposeBenefits,
        scheduledDateTime: filteredCamp.scheduledDateTime,
        healthcareProfessionals: filteredCamp.healthcareProfessionals,
        participantName: name,
        participantAge: age,
        participantPhone: phone,
        participantEmergency_contact: emergency_contact,
        participantAddress: address,
        participantGender: gender 
      };

      axiosSecure.post('/participant', participantInfo)
        .then(res => {
          if (res.data.insertedId) {
            console.log('info added');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: 'Registration completed successfully!',
              text: 'You have successfully joined this medical camp.',
              showConfirmButton: false,
              timer: 2500
            });
            
            // Close the modal after successful submission
            document.getElementById('my_modal_5').close();
            
            refetch();
          }
        })
        .catch(error => {
          console.error("Error registering for camp:", error);
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "There was an error processing your registration. Please try again.",
          });
        });
    }
  };

  // Check if 'camp' is not defined or empty
  if (!camp || camp.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading camp details...</p>
        </div>
      </div>
    );
  }

  // Find the camp with the matching ID
  const filteredCamp = camp.find(item => item._id === id);

  // Check if the camp with the given ID is not found
  if (!filteredCamp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl text-gray-300 mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Camp Not Found</h2>
          <p className="text-gray-600 mb-6">The medical camp you're looking for doesn't seem to exist or may have been removed.</p>
          <Link to='/availableCamps'>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
              View All Available Camps
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to safely render array data
  const safeRenderArray = (array, limit = 2) => {
    if (!array || !Array.isArray(array)) {
      return [];
    }
    return array.slice(0, limit);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>CampSwift | {filteredCamp.campName || "Camp Details"}</title>
      </Helmet>

      {/* Hero section with camp image and name */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img 
            src={filteredCamp.image} 
            alt={filteredCamp.campName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {filteredCamp.campName}
            </h1>
            <div className="flex items-center text-white/80 text-sm md:text-base">
              <FaCalendarAlt className="mr-2" />
              <span>{filteredCamp.scheduledDateTime || "Date not specified"}</span>
            </div>
          </div>
        </div>

        {/* Camp details */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Main info */}
          <div className="lg:col-span-2">
            <div className="bg-primary/5 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Medical Camp</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {filteredCamp.purposeBenefits || "Information about this medical camp's purpose and benefits will be provided soon."}
              </p>
            </div>

            {/* Services section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCheckCircle className="text-primary mr-2" />
                Specialized Services
              </h2>
              
              {!filteredCamp.specializedServices || !Array.isArray(filteredCamp.specializedServices) || filteredCamp.specializedServices.length === 0 ? (
                <p className="text-gray-500 italic">No specialized services listed for this camp.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredCamp.specializedServices.map((service, index) => (
                    <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-start">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <FaCheckCircle className="text-primary" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Healthcare professionals */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaUserMd className="text-primary mr-2" />
                Healthcare Professionals
              </h2>
              
              {!filteredCamp.healthcareProfessionals || !Array.isArray(filteredCamp.healthcareProfessionals) || filteredCamp.healthcareProfessionals.length === 0 ? (
                <p className="text-gray-500 italic">No healthcare professionals listed for this camp.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {filteredCamp.healthcareProfessionals.map((professional, index) => (
                    <div key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center">
                      <FaUserMd className="mr-2" />
                      {professional}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column - Details and registration */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                Camp Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{filteredCamp.venueLocation || "Location not specified"}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaCalendarAlt className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-800">{filteredCamp.scheduledDateTime || "Date not specified"}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaUsers className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Target Audience</p>
                    <p className="font-medium text-gray-800">{filteredCamp.targetAudience || "General public"}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaMoneyBillWave className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Camp Fees</p>
                    <p className="font-medium text-gray-800">
                      {filteredCamp.campFees ? `$${filteredCamp.campFees}` : "Free"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                {isOrganizer ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800 font-medium">You are an organizer</p>
                    <p className="text-sm text-yellow-700 mt-1">Organizers cannot register for camps</p>
                  </div>
                ) : (
                  <button 
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center"
                  >
                    <span className="mr-2">Register for This Camp</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                
                <Link to='/availableCamps' className="mt-4 block"> 
                  <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    View All Available Camps
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white p-0 rounded-xl max-w-md mx-auto">
          <div className="bg-primary text-white py-4 px-6 rounded-t-xl">
            <h3 className="font-bold text-lg">Register for {filteredCamp.campName}</h3>
            <p className="text-white/80 text-sm">Please fill in your information to join this camp</p>
          </div>
          
          <form onSubmit={handleJoinCamp} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Full Name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input 
                    type="number" 
                    name="age" 
                    placeholder="Your Age" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select 
                    name="gender" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
                    required
                  >
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Your Phone Number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input 
                  type="text" 
                  name="emergency_contact" 
                  placeholder="Emergency Contact Number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea 
                  name="address" 
                  placeholder="Your Full Address" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  rows="2"
                  required 
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end gap-4">
              <button 
                type="button"
                onClick={() => document.getElementById('my_modal_5').close()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CampDetails;