import React, { useState } from 'react';


function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [key, setKey] = useState(Date.now());

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfUrl(e.target.result);
        setKey(Date.now()); // Update key to force re-render
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Half */}
      <div style={{ flex: '1', backgroundColor: '#f0f0f0' }}>
        {/* Optional other content here */}
      </div>
      
      {/* Right Half - PDF Viewer */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {pdfUrl && (
          <embed key={key} src={pdfUrl} type="application/pdf" style={{ width: '50vw', height: '100vh' }} />
        )}
      </div>
      
      {/* File Input */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ position: 'absolute', bottom: '10px', left: '10px' }} />
    </div>
  );
}


export default PdfViewer;
