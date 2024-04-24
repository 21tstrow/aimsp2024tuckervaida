import React, { useState } from 'react';

function PdfUpload({ onFileChange }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(selectedFile);
      onFileChange(fileUrl);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="pdf-upload">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
  );
}

export default PdfUpload;
