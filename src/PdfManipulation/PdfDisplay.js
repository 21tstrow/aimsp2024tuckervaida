import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import './PdfDisplay.css';
<<<<<<< HEAD
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFDownloadLink, PageText } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
=======
>>>>>>> b514922 (some new additions)

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

function PdfDisplay({ file, onTextSelect, useAdvancedViewer = false }) {
    const [selectedText, setSelectedText] = useState('');

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const text = selection.toString();
        setSelectedText(text);
        if (onTextSelect) onTextSelect(text);
        console.log("Selected Text:", text);
    };

    useEffect(() => {
        if (useAdvancedViewer) {
            window.addEventListener('mouseup', handleTextSelection);
            return () => window.removeEventListener('mouseup', handleTextSelection);
        }
    }, [useAdvancedViewer]);

<<<<<<< HEAD
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

=======
    return (
        <div className='pdf-display-container'>
            {useAdvancedViewer ? (
                <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}>
                    {file && (
                        <Viewer
                            fileUrl={file}
                            defaultScale={0.95}
                            onDocumentLoad={({ numPages }) => console.log('Loaded a file with ', numPages, ' pages')}
                            onTextSelection={handleTextSelection}
                        />
                    )}
                </Worker>
            ) : (
                file && (
                    <embed src={file} type="application/pdf" width="100%" height="100%" />
                )
            )}
        </div>
    );
}

>>>>>>> b514922 (some new additions)
export default PdfDisplay;
