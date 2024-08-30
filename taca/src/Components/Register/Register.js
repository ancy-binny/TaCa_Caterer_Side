import React, { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
// import axios from 'axios';

const RegisterPage = () => {
  const [serviceName, setServiceName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/register', {
        serviceName,
        location,
        phoneNumber,
        email,
        address,
        password,
      });
      if (response.status === 201) {
        console.log('Successfully registered');
        navigate('/loginpage');
      }
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('Registration failed');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className={styles.input}
            placeholder="Service Name"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            placeholder="Location (City)"
            required
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
            placeholder="Phone Number"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
            placeholder="Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Set Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
