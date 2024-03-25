import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import DisplayPDF from './functions/UploadPDF.js';
import HomePage from './HomePage';
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
        <div className="content-wrapper" style={{ marginLeft: navbarWidth + 30}}>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
          </Routes>
          <DisplayPDF />
        </div>
      </Router>
    </div>
  );
}

export default App;