import React, { useState } from 'react';

function PdfUpload({ onFileChange }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
  };

  return (
    <div className="pdf-upload">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
}

export default PdfUpload;