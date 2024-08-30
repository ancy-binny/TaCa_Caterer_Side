import React from 'react';
import './Footer.css'; // Import your footer CSS file
   
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>Service and Convenience</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="fa fa-map-marker"></i> 24 SG Palya, Bangalore, India</p>
          <p><i className="fa fa-phone"></i> +91 7259653928</p>
          <p><i className="fa fa-envelope"></i> taca@gmail.com</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>TACACopyright &copy; 2024 | Designed by TACA</p>
      </div>
    </footer>
  );
};

export default Footer;
