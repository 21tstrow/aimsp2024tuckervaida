import React, { useState, useEffect } from 'react';
import { getDocument } from 'pdfjs-dist';
import './ImageTile.css';

const ImageTile = ({ title, imageUrl }) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      if (imageUrl.endsWith('.pdf')) {
        try {
          const workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; // Replace [version] with the version number if needed
          const loadingTask = getDocument(imageUrl, { workerSrc });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          setImgSrc(canvas.toDataURL('image/jpeg'));
        } catch (error) {
          console.error('Error loading PDF: ', error);
          setImgSrc('');
        }
      } else {
        setImgSrc(imageUrl);
      }
    };

    fetchPdf();
  }, [imageUrl]);

  return (
    <div className="image-tile-wrapper">
      <div className="image-tile">
        <div className="image-wrapper">
          <img src={imgSrc || imageUrl} alt={title} onError={(e) => e.target.src = 'fallback_image.jpg'} />
        </div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default ImageTile;