// PdfViewer.js
import React, { useState, useEffect } from 'react';

const PdfViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection) {
        setSelectedText(selection.toString());
      }
    };

    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []); // Only run this effect once

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <h2>Uploaded PDF:</h2>
          <embed
            src={URL.createObjectURL(pdfFile)}
            width="800"
            height="600"
            type="application/pdf"
          />
          {selectedText && (
            <div>
              <h2>Selected Text:</h2>
              <p>{selectedText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfViewer;