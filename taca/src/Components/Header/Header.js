import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../../axiosConfig';

function Header({ setSearchTerm }) {

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const controlHeader = useCallback(() => {
        if (window.scrollY > lastScrollY) {
          // Scroll down
          setIsVisible(false);
        } else {
          // Scroll up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }, [lastScrollY]);
    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId && token) {
            // Optionally, you can also check if the token is expired here
            setIsLoggedIn(true);

            // Fetch username from the database
            axios.get(`/caterer/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUsername(response.data.serviceName);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle the error, e.g., log out the user if the token is invalid
                handleLogout();
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', controlHeader);
    
        return () => {
          window.removeEventListener('scroll', controlHeader);
        };
      }, [controlHeader]);

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        window.location.reload(); // Optionally, you can refresh the page or redirect the user
    };

    return (
        <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="logo">
                <img src="/images/logo.png" alt="TACA" />
            </div>
            {isLoggedIn ? (
                <nav className="nav">
                    <NavLink 
                        to="/" 
                        className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/menupage" 
                        className={`nav-link ${activeLink === '/menupage' ? 'active' : ''}`}
                    >
                        Menu
                    </NavLink>
                    <NavLink 
                        to="/orderpage" 
                        className={`nav-link ${activeLink === '/orderpage' ? 'active' : ''}`}
                    >
                        Orders
                    </NavLink>
                    <NavLink 
                        to="/profilepage" 
                        className={`nav-link ${activeLink === '/profilepage' ? 'active' : ''}`}
                    >
                        Profile
                    </NavLink>
                </nav>
            ) : null}
            <div className="actions">
                {!isLoggedIn ? (
                    <>
                        <a href="/registerpage">Register</a>
                        <a href="/loginpage">Login</a>
                    </>
                ) : (
                    <>
                       <div className="user-info">
    <span className="welcome-message">Welcome, {username}</span>
    <button className="logout-button" onClick={handleLogout}>Logout</button>
</div>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
