import React, { useState } from 'react';
import ImageTile from './ImageTile';
import SearchBar from './SearchBar'; // Import the SearchBar component
import './HomePage.css';
import './SearchBar.css'

import Mountain1 from './components/Mountain1.jpeg';
import Mountain2 from './components/Mountain2.jpeg';
import Mountain3 from './components/Mountain3.jpeg';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Assuming you have an array of image data with titles and URLs
  const imageTilesData = [
    { title: 'Title1', imageUrl: Mountain1 },
    { title: 'Title2', imageUrl: Mountain2 },
    { title: 'Title3', imageUrl: Mountain3 },
    { title: 'Title4', imageUrl: Mountain1 },
    { title: 'Title5', imageUrl: Mountain2 },
    { title: 'Title6', imageUrl: Mountain3 },
    { title: 'Title91', imageUrl: Mountain1 },
    { title: 'Title92', imageUrl: Mountain2 },
    { title: 'Title93', imageUrl: Mountain3 },
    { title: 'Title94', imageUrl: Mountain1 },
    { title: 'Title95', imageUrl: Mountain2 },
    { title: 'Title96', imageUrl: Mountain3 },
    // Add more image data as needed
  ];

  // Filter image tiles based on search query
  const filteredImageTiles = imageTilesData.filter(imageTile => 
    imageTile.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* Render the SearchBar component */}
      <div className="search-bar-wrapper-homepage">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="image-tiles-wrapper">
        {filteredImageTiles.map((imageTileData, index) => (
          <ImageTile key={index} title={imageTileData.title} imageUrl={imageTileData.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;