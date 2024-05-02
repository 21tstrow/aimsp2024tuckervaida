import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [overlayText, setOverlayText] = useState('');
  const [renderedPdf, setRenderedPdf] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  // Function to handle text input change
  const handleTextChange = (event) => {
    setOverlayText(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      alert('Please upload a PDF file');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Add overlay text to the PDF
      firstPage.drawText(overlayText, {
        x: 50,
        y: 50,
        size: 30,
        color: rgb(0, 0, 0),
      });

      // Save the modified PDF as a new file
      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      setRenderedPdf(URL.createObjectURL(modifiedPdfBlob));
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  return (
    <div>
      <h1>PDF Text Overlay App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pdfFile">Upload PDF:</label>
          <input type="file" id="pdfFile" accept=".pdf" onChange={handleFileUpload} />
        </div>
        <div>
          <label htmlFor="overlayText">Overlay Text:</label>
          <input type="text" id="overlayText" value={overlayText} onChange={handleTextChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {renderedPdf && (
        <div>
          <h2>Rendered PDF with Overlay Text</h2>
          <embed src={renderedPdf} type="application/pdf" width="100%" height="600px" />
        </div>
      )}
    </div>
  );
}

export default App;
