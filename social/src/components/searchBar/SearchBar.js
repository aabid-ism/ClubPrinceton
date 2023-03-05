import React, { useState } from "react";
import axios from 'axios';

const url = 'http://localhost:5050/clubs';

function SearchBarChild(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(["ab"]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);

    axios.get(url)
    .then(response => {
      const data = response.data;
      setResults(data)
    })
    .catch(error => {
      console.log('Error occurred: ', error)
    })
  };

  const handleSearchClick = () => {

  };

  return (
    <div
      className="mx-auto p-6 bg-white rounded-lg shadow-lg margin-10p"

    >
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
        {results.map((result) => (
          <p className="text-gray-700 mb-2 border-b border-gray-300">{result.name}</p>
        ))};
      </div>
    </div>
  );
}

function SearchBar(props) {
  return (
    <div

    >
      <SearchBarChild width={props.width} height={props.height} />
    </div>
  );
}

export default SearchBar;
