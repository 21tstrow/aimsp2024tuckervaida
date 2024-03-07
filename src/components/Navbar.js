import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if(window.innerWidth <960) {
            setButton(false);
        }else{
            setButton(true);
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        Analyze.Ai
                        </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <img src={require('./menu_icon.png')} width = "25em" />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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
                               Lorem 
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                               Ipsum 
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn-outline'> SIGN UP</Button>}
                </div>
            </nav>
        </>

    )
}

export default Navbar