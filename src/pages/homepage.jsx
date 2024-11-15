import React, { useState } from 'react';
import SearchBar from './components/searchBar.jsx';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    // Example API call or logic to search songs or artists
    console.log('Searching for:', query);
    setSearchResults([{ name: 'Song 1' }, { name: 'Song 2' }]);
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Search for Songs or Artists</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h2>Search Results:</h2>
        {searchResults.map((result, index) => (
          <div key={index}>{result.name}</div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;