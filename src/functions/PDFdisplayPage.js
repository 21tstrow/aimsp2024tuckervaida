import React, { useState } from 'react';

function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPdfUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Half */}
      <div style={{ flex: '1', backgroundColor: '#f0f0f0' }}>
        {/* Your other content here */}
      </div>
      
      {/* Right Half */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* PDF Viewer */}
        {pdfUrl && (
          <embed src={pdfUrl} type="application/pdf" style={{ width: '50vw', height: '100vh' }} />
        )}
      </div>
      
      {/* File Input */}
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default PdfViewer;
