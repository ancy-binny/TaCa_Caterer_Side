import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    // If no user ID or token is found, redirect to the login page
    return <Navigate to="/loginpage" />;
  }

  // If authenticated, render the child components (protected route)
  return children;
};

export default PrivateRoute;
