import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search applications..."
        value={keyword}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 mr-2"
      />
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
