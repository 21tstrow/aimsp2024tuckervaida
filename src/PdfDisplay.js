import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfDisplay.css'; // Import your CSS file

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfDisplay({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  // Event handler for loading PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Event listener for text selection
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      setSelectedText(selection.toString());
    };

    window.addEventListener('mouseup', handleTextSelection);

    return () => {
      window.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  return (
    <div className='return-wrapper'>
      <div className="pdf-display">
        {file && (
          <div className="pdf-meta">
            <p>
              Selected Text: {selectedText}
            </p>
          </div>
        )}
      </div>
    <div className="pdf-display-container">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode="svg"
            noData={true}
            className="pdf-document" // Apply document class
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-page" // Apply page class
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

export default PdfDisplay;