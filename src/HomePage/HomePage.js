import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import ImageTile from '../ImageTile/ImageTile.js';
import SearchBar from '../SearchBar/SearchBar.js';
import './HomePage.css';
import '../SearchBar/SearchBar.css';
import plusImage from '../components/Plus.png'; // Import the plus.png image
import ApplicationPage from '../ApplicationPage/ApplicationPage.js'; // Import the ApplicationPage component

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageTilesData, setImageTilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

  useEffect(() => {
    // Fetch the list of files from the server
    fetch('http://localhost:5000/public/uploads')
      .then(response => response.json())
      .then(data => setImageTilesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Filter image tiles based on search query
  const filteredImageTiles = imageTilesData.filter(imageTile =>
    imageTile.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle click event for regular image tiles
  const handleImageTileClick = (file) => {
    setSelectedFile(file); // Set the selected file
  };

  return (
    <div className="homepage">
      {/* Render the SearchBar component */}
      <div className="search-bar-wrapper-homepage">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="image-tiles-wrapper">
        {/* Render filtered image tiles */}
        {filteredImageTiles.map((imageTileData, index) => (
          <Link key={index} to="/application" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ImageTile 
              title={imageTileData.title} 
              imageUrl={imageTileData.imageUrl} 
              onClick={() => handleImageTileClick(imageTileData.file)} // Pass onClick handler
              file={imageTileData.file} // Pass the file to ImageTile
            />
          </Link>
        ))}
        {/* Render additional tile for uploading */}
        <Link to="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ImageTile 
            title="Upload Files" 
            imageUrl={plusImage} 
            isUploadTile 
          />
        </Link>
      </div>

      {/* Render ApplicationPage component only when a file is selected */}
      {selectedFile && <ApplicationPage file={selectedFile} />}
    </div>
  );
};

export default HomePage;