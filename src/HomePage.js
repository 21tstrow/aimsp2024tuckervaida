import React from 'react';
import ImageTile from './ImageTile';
import './HomePage.css'

import Mountain1 from './components/Mountain1.jpeg';
import Mountain2 from './components/Mountain2.jpeg';
import Mountain3 from './components/Mountain3.jpeg';

const HomePage = () => {
  // Assuming you have an array of image data with titles and URLs
  const imageTilesData = [
    { title: 'Title1', imageUrl: Mountain1 },
    { title: 'Title2', imageUrl: Mountain2 },
    { title: 'Title3', imageUrl: Mountain3 },
    { title: 'Title4', imageUrl: Mountain1 },
    { title: 'Title5', imageUrl: Mountain2 },
    { title: 'Title6', imageUrl: Mountain3 },
    // Add more image data as needed
  ];

  return (
    <div className="homepage">
      <div className="image-tiles-wrapper">
        {imageTilesData.map((imageTileData, index) => (
          <ImageTile key={index} title={imageTileData.title} imageUrl={imageTileData.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;