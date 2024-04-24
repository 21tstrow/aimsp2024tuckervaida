import React, { useState } from 'react';
import PdfDisplay from './PdfDisplay'; // Importing once is sufficient
import samplePDF from './sample.pdf'; // Path to your sample PDF file
import ChatComponent from './ChatComponent'; // Simplified chat component

const Home = () => {
  const [selectedText, setSelectedText] = useState('');

  // This function is called when text is selected within the PDF viewer
  const handleTextSelect = (text) => {
    setSelectedText(text);
    console.log('Selected Text:', text);
  };

  // This function logs the selected text when the button is clicked
  const handleLogSelected Text = () => {
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
