import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfDisplay.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfDisplay({ file, onTextSelect }) {
  const [numPages, setNumPages] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  // Event handler for loading PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Event listener for text selection
  useEffect(() => {
    if (!onTextSelect) return; // Check if onTextSelect is provided

    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString();
      setSelectedText(text);
      // Pass selected text to parent component
      onTextSelect(text);
      console.log("Selected Text:", text); // Log the selected text
    };

    window.addEventListener('mouseup', handleTextSelection);

    return () => {
      window.removeEventListener('mouseup', handleTextSelection);
    };
  }, [onTextSelect]);

  return (
    <div className='return-wrapper'>
      <div className="pdf-display-container">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode="svg"
            noData={true}
            className="pdf-document"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-page"
                scale={1.5}               
                renderAnnotationLayer={false} 
                renderTextLayer={true}
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

export default PdfDisplay;