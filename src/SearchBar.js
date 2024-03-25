import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  // Event handler to update search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
    </div>
  );
};

export default SearchBar;