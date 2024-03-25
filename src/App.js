import React from 'react';
import Navbar from './components/Navbar.js'
import DisplayPDF from './functions/UploadPDF.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
        </Routes>
      </Router>
      <DisplayPDF />
    </div>
  );
}

export default App;
