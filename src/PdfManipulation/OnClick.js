import React, { useState } from 'react';
import PdfDisplay from './PdfDisplay'; // Assuming PdfDisplay.js is in the same directory
import samplePDF from './sample.pdf'; // Path to your sample PDF file

const Home = () => {
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelect = (text) => {
    setSelectedText(text);
    console.log('Selected Text:', text);
  };

  const handleLogSelectedText = () => {
    console.log('Selected Text from Button Click:', selectedText);
  };

  return (
    <div className="home">
      <h2>Homepage</h2>
      <PdfDisplay file={samplePDF} onTextSelect={handleTextSelect} />
      <div>
        <strong>Selected Text:</strong> {selectedText}
      </div>
      <button onClick={handleLogSelectedText}>Log Selected Text</button>
    </div>
  );
};

export default Home;
