import React, { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    // Perform search logic here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="w-${props.width} h-${props.height} mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col">
        <input
          type="text"
          className="form-control w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 float-left"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button
          type="button"
          className="float-right bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className="mt-4 bg-gray-200 rounded-lg p-4">
        <p className="text-gray-700 mb-2 border-b border-gray-300">Result 1</p>
        <p className="text-gray-700 mb-2 border-b border-gray-300">Result 2</p>
        <p className="text-gray-700 mb-2">Result 3</p>
      </div>
    </div>
  );
}

export default SearchBar;
