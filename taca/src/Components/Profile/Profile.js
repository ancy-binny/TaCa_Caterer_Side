import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './Profile.css'; // Assuming you have a CSS file for the theme

const Profile = () => {
  const [caterer, setCaterer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    location: '',
    phoneNumber: '',
    email: '',
    address: '',
    ratings: ''
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCatererDetails = async () => {
      try {

        const response = await axios.get(`/profile/${userId}`); // Adjusted endpoint to include userId
        setCaterer(response.data);
        setFormData({
          serviceName: response.data.serviceName,
          location: response.data.location,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          address: response.data.address,
          ratings: response.data.ratings
        });
      } catch (error) {
        console.error('Error fetching caterer details:', error);
      }
    };

    fetchCatererDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/profile/${userId}`, formData); // Adjust endpoint as needed
      setCaterer(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating caterer details:', error);
    }
  };

  return (
    <div className="profile-page">
      {caterer && (
        <>
          <h1>{caterer.serviceName}</h1>
          <p><strong>Location:</strong> {caterer.location}</p>
          <p><strong>Phone Number:</strong> {caterer.phoneNumber}</p>
          <p><strong>Email:</strong> {caterer.email}</p>
          <p><strong>Address:</strong> {caterer.address}</p>
          <p><strong>Ratings:</strong> {caterer.ratings}</p>
          <button onClick={() => setIsModalOpen(true)} className="edit-button">Edit Profile</button>
        </>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Service Name:
                <input type="text" className='profile-input' name="serviceName" value={formData.serviceName} onChange={handleInputChange} />
              </label>
              <label>
                Location:
                <input type="text" className='profile-input' name="location" value={formData.location} onChange={handleInputChange} />
              </label>
              <label>
                Phone Number:
                <input type="text" className='profile-input' name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              </label>
              <label>
                Email:
                <input type="email" className='profile-input' name="email" value={formData.email} onChange={handleInputChange} />
              </label>
              <label>
                Address:
                <input type="text" className='profile-input' name="address" value={formData.address} onChange={handleInputChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
