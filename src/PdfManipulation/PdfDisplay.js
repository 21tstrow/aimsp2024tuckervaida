import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfDisplay.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFDownloadLink, PageText } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

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
  const downloadPdf = async () => {
    try {
      const blob = await fetch(file).then(res => res.blob());
      saveAs(blob, "downloaded.pdf");  // Use saveAs to download the file
    } catch (error) {
      console.error('Error downloading the file: ', error);
    }
  };

  return (
    <div>
      <button onClick={downloadPdf}>Download PDF</button>
      <div className='return-wrapper'>
        <div className="pdf-display-container">
          {file && (
            <PdfDocument file={file} onDocumentLoadSuccess={onDocumentLoadSuccess} numPages={numPages} />
          )}
        </div>
      </div>
    </div>
  );
}

const PdfDocument = ({ file, onDocumentLoadSuccess, numPages }) => {
  
  return (
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
          scale={0.95}
          renderAnnotationLayer={false}
          renderTextLayer={true}
        />
      ))}
    </Document>
  );
};

export default PdfDisplay;
