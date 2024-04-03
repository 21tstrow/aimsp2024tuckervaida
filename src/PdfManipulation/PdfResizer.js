import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfResizer({ file, onPdfResized }) {
  const [resizedPdf, setResizedPdf] = useState(null);

  const resizePdf = async (input) => {
    let pdfBytes;
    
    // Check if the input is a URL or a File object
    if (typeof input === 'string') {
      const response = await fetch(input);
      pdfBytes = await response.arrayBuffer();
    } else {
      pdfBytes = await input.arrayBuffer();
    }

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    // Resize all pages proportionally
    pages.forEach(page => {
      const { width, height } = page.getSize();
      const scale = Math.min(600 / width, 800 / height);
      page.setWidth(width * scale);
      page.setHeight(height * scale);
    });

    const resizedPdfBytes = await pdfDoc.save();
    const resizedPdfBlob = new Blob([resizedPdfBytes]);
    setResizedPdf(resizedPdfBlob);
    onPdfResized(resizedPdfBlob); // Pass the resized PDF to the parent component
  };

  // Resize PDF when file changes
  useEffect(() => {
    if (file) {
      resizePdf(file);
    }
  }, [file]);

  return null; // PdfResizer doesn't render anything
}

export default PdfResizer;