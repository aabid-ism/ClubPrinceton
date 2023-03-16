import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:5050/clubs";

function SearchBar(props) {
  const [results, setResults] = useState([]);
  const [numResults, setNumResults] = useState(0);

  const handleSearchTermChange = async (event) => {
    let searchWord = event.target.value;
    console.log(searchWord);
    console.log(`${url}/${searchWord}`);

    axios
      .get(`${url}/${searchWord}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setResults(data);
        setNumResults(data.length);
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
  };

  const searchBarStyle = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: "#FFE4CC",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  };

  const resultsStyle = {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "#FFE4CC",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
  };

  return (
    <div style={searchBarStyle}>
      <input
        type="text"
        className="form-control w-full border border-gray-300 rounded-lg py-2 px-4 mb-4"
        placeholder="Search..."
        onChange={handleSearchTermChange}
      />
      <p>{numResults} search results</p>
      {results.length > 0 && (
        <div style={resultsStyle}>
          {results.map((result, index) => (
            <p
              className={`text-gray-700 mb-2 border-b border-black ${
                index === results.length - 1 ? "pb-0" : ""
              }`}
              key={result.id}
            >
              {result.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
