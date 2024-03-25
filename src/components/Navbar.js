import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [navbarWidth, setNavbarWidth] = useState(250); // Default width for the navbar

    useEffect(() => {
        const updateNavbarWidth = () => {
            const windowWidth = window.innerWidth;
            const newWidth = Math.min(Math.max(75, windowWidth / 5), 200); // Minimum width of 100px, progressively narrower
            setNavbarWidth(newWidth);
        };

        updateNavbarWidth(); // Call initially

        window.addEventListener('resize', updateNavbarWidth);

        return () => {
            window.removeEventListener('resize', updateNavbarWidth);
        };
    }, []);

    return (
        <nav className="navbar" style={{ width: navbarWidth }}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Analyze.Ai
                </Link>
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/application' className='nav-links'>
                            Application
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            About
                        </Link>
                    </li>
                </ul>
                <Button buttonStyle='btn-outline'> SIGN UP</Button>
            </div>
        </nav>
    )
}

export default Navbar;