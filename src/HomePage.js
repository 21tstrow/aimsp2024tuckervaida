// HomePage.js

import React from 'react';
import ImageTile from './ImageTile';


// Import your 16 images
import Mountain1 from './components/Mountain1.jpeg';
import Mountain2 from './components/Mountain2.jpeg';
import Mountain3 from './components/Mountain3.jpeg';
// Repeat this for image4 through image16

const HomePage = () => {
  // Array containing paths to the images
  const images = [Mountain1, Mountain2, Mountain3 /* Add image4 through image16 here */];

  return (
    <div>
      <h1>Homepage</h1>
      <div className="image-tiles">
        {images.map((src, index) => (
          <ImageTile key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;