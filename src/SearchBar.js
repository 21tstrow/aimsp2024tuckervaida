// SearchBar.js

import React from 'react';
import './SearchBar.css'; // Import the SearchBar.css file

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  // Event handler to update search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Event handler for submitting the search form
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // You can perform any action here, such as filtering images based on the search query
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="search-input" // Add class name for input
            placeholder="Search by title..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <button type="submit" className="search-button">Search</button> {/* Search button */}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;