import React from 'react';
import './ImageTile.css';

const ImageTile = ({ src }) => {
  return (
    <div className="image-tile">
      <img src={src} alt="Uploaded" />
    </div>
  );
};

export default ImageTile;