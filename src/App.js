import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import HomePage from './HomePage/HomePage';
import ApplicationPage from './ApplicationPage/ApplicationPage'; // Import the ApplicationPage component
import UploadPage from './UploadPage.js';
import AboutPage from './AboutPage/AboutPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [navbarWidth, setNavbarWidth] = useState(200);

  useEffect(() => {
    const updateNavbarWidth = () => {
      const navbarElement = document.querySelector('.navbar');
      if (navbarElement) {
        const width = navbarElement.offsetWidth;
        setNavbarWidth(width);
      }
    };
  
    window.addEventListener('resize', updateNavbarWidth);
    updateNavbarWidth();
  
    return () => window.removeEventListener('resize', updateNavbarWidth);
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content-wrapper" style={{ marginLeft: navbarWidth}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;