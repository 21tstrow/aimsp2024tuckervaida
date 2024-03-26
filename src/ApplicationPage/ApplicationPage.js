import React, { useState } from 'react';
import PdfUpload from '../PdfManipulation/PdfUpload';
import PdfDisplay from '../PdfManipulation/PdfDisplay';
import PdfResizer from '../PdfManipulation/PdfResizer';
import './ApplicationPage.css';

function ApplicationPage() {
  const [file, setFile] = useState(null);
  const [resizedFile, setResizedFile] = useState(null);
  const [textInput, setTextInput] = useState('');

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handlePdfResized = (resizedPdf) => {
    setResizedFile(resizedPdf);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleApiSubmit = () => {
    console.log(textInput);
  };

  const handleTextSelect = (selectedText) => {
    setTextInput(selectedText); // Update input value with selected text
  };

  return (
    <div className="application-page">
      <div className='pdf-viewer'>
        <div className="pdf-upload-section">
          <h2>PDF Upload</h2>
          <PdfUpload onFileChange={handleFileChange} />
        </div>
        <div className="pdf-display-section">
          <h2>PDF Display</h2>
          <PdfResizer file={file} onPdfResized={handlePdfResized} />
          <PdfDisplay file={resizedFile || file} onTextSelect={handleTextSelect} />
        </div>
      </div>
      <div className="api-section">
        <div className="api-content">
          <h2>OpenAI API</h2>
          <div className="api-input">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter text for OpenAI API"
            />
            <button onClick={handleApiSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;