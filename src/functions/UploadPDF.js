import React, { useState } from 'react';

function DisplayPDF() {
  // Define state to hold the URL of the selected PDF file
  const [pdfUrl, setPdfUrl] = useState(null);

  // Function to handle the change event when a PDF file is selected
  const handlePdfInputChange = (event) => {

    // Get the selected file from the input element
    const file = event.target.files[0];

    // Check if a file is selected and it's a PDF
    if (file && file.type === 'application/pdf') {

      // Create a FileReader to read the selected PDF file
      const reader = new FileReader();

      // Set up the onload event handler to set the PDF URL in the state
      reader.onload = (e) => {

        // Set the PDF URL in the state using the result of FileReader
        setPdfUrl(e.target.result);
      };

      // Read the selected file as a Data URL
      reader.readAsDataURL(file);
    } else {
      
      // Display an alert if the selected file is not a PDF
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <>
      {/* Input element to select a PDF file */}
      <div className="pdf-upload">
        <input type="file" id="pdfInput" onChange={handlePdfInputChange} accept="application/pdf" />
      </div>

      {/* Conditionally render the PDF viewer if a PDF URL is set */}
      {pdfUrl && (
        <div className="pdf-viewer">
          {/* Display the PDF using an iframe */}
          <iframe src={pdfUrl} width="100%" height="750px" title="PDF Viewer" />
        </div>
      )}
    </>
  );
}

export default DisplayPDF;