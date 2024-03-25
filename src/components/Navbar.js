import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
    // Define state variables
    const [click, setClick] = useState(false); // State for handling click event to toggle mobile menu
    const [button, setButton] = useState(true); // State for displaying a button based on screen width

    // Function to handle click event
    const handleClick = () => setClick(!click);
    // Function to close the mobile menu
    const closeMobileMenu = () => setClick(false);
    // Function to determine whether to display the button based on screen width
    const showButton = () => {
        if (window.innerWidth < 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, []);

    // Hook to listen for window resize events and adjust button visibility accordingly
    window.addEventListener('resize', showButton);

    // Return JSX for the navbar component
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Analyze.Ai
                    </Link>
                    {/* Menu icon for mobile view */}
                    <div className='menu-icon' onClick={handleClick}>
                        <img src={require('./menu_icon.png')} width="25em" alt="Menu Icon" />
                    </div>
                    {/* Navigation menu */}
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {/* Menu items */}
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Account
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                    </ul>
                    {/* Display the button if button state is true */}
                    {button && <Button buttonStyle='btn-outline'> SIGN UP</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;