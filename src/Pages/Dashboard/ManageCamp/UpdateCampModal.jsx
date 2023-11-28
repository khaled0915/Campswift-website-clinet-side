import { useEffect, useState } from "react";


const UpdateCampModal = ({ isOpen, onClose, campDetails, onUpdate }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Set initial form data when the campDetails prop changes
    setFormData(campDetails);
  }, [campDetails]);

  const handleChange = (e) => {
    // Update form data as the user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send update request to the server
    onUpdate(formData);
    // Close the modal after submitting
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={onClose}>&times;</span>
            <h2>Update Camp</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="campName">Camp Name:</label>
              <input
                type="text"
                id="campName"
                name="campName"
                value={formData.campName || ''}
                onChange={handleChange}
                required
              />

              {/* Add other form fields for other details */}
              {/* Example:
              <label htmlFor="purposeBenefits">Purpose/Benefits:</label>
              <textarea
                id="purposeBenefits"
                name="purposeBenefits"
                value={formData.purposeBenefits || ''}
                onChange={handleChange}
                required
              />
              */}

              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCampModal;
