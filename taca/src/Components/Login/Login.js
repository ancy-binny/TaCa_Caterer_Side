import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/userContext'; // Adjust the path as necessary
import './Login.css';
import axios from '../../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { setUser } = useUser(); // Access the context to set user data

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      if (response.status === 200) {
        console.log('Login successful', response.data);
        localStorage.removeItem('userId');
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        setUser({
          email: user.email,
          location: user.location,
          serviceName: user.serviceName,
          _id: user._id
        }); // Set user data in global state
        alert('Login successful');
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed');
    }
  };

  const handleRegisterClick = () => {
    navigate('/registerpage');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Login</button>
          <div className="register-link">
            Don't have an account? <button type="button" onClick={handleRegisterClick} className="link-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
