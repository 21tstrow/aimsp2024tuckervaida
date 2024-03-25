import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfResizer({ file, onPdfResized }) {
  const [resizedPdf, setResizedPdf] = useState(null);

  const resizePdf = async (file) => {
    const pdfBytes = await file.arrayBuffer();
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
    setResizedPdf(new Blob([resizedPdfBytes]));
    onPdfResized(new Blob([resizedPdfBytes])); // Pass the resized PDF to the parent component
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