import React, { useState } from 'react';

function DisplayPDF() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handlePdfInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <>
      <div className="pdf-upload">
        <input type="file" id="pdfInput" onChange={handlePdfInputChange} accept="application/pdf" />
      </div>
      {pdfUrl && (
        <div className="pdf-viewer">
          <iframe src={pdfUrl} width="100%" height="750px" title="PDF Viewer" />
        </div>
      )}
    </>
  );
}

export default DisplayPDF;