import React from 'react';
import './ImageTile.css';

const ImageTile = ({ title, imageUrl }) => {
  return (
    <div className="image-tile-wrapper">
      <div className="image-tile">
        <div className="image-wrapper">
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default ImageTile;