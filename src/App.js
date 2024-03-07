import React from 'react';
import Navbar from './components/Navbar.js'
import DisplayPDF from './UploadPDF.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
      <DisplayPDF />
    </div>
  );
}

export default App;
