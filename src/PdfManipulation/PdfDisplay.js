import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfDisplay.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfDisplay({ file, onTextSelect }) {
  const [numPages, setNumPages] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (!onTextSelect) return;

    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString();
      setSelectedText(text);
      onTextSelect(text);
      console.log("Selected Text:", text);
    };

    window.addEventListener('mouseup', handleTextSelection);
    return () => window.removeEventListener('mouseup', handleTextSelection);
  }, [onTextSelect]);

  const downloadPdf = async () => {
    try {
      const blob = await fetch(file).then(res => res.blob());
      saveAs(blob, "downloaded.pdf");
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
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdf-document"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="pdf-page"
                  scale={0.95}
                  renderTextLayer={true}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfDisplay;
