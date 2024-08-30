import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
