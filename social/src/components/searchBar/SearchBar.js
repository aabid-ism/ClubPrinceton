import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";

const url = "http://localhost:5050/clubs";

function SearchBar(props) {
  const dispatch = useDispatch();
  const results = useSelector(state => state.results);
  const numResults = useSelector(state => state.numResults);
  const clubData = useSelector(state => state.clubData);

  const handleSearchTermChange = async (event) => {
    let searchWord = event.target.value;
    console.log(searchWord);
    console.log(`${url}/${searchWord}`);

    axios
      .get(`${url}/${searchWord}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch({ type: "SET_RESULTS", payload: { results: data, numResults: data.length } });
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
  };


  const handleClubClick = (club) => {
    console.log(`Clicked on ${club.name}`);
    axios
      .get(`${url}/a/${club.name}`)
      .then((response) => {
        const data = response.data;
        console.log("data was recieved: " + data);
        // handle club data
        dispatch({ type: "SET_CLUB_DATA", payload: { clubData: data[0] } });
        console.log("Dispatched club data:", data[0]);
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
    height: "70%",
    backgroundColor: "transparent",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const resultButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid black",
    color: "black",
    cursor: "pointer",
    fontSize: "16px",
    padding: "5px 0",
    textAlign: "left",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
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
          {results.map((result) => (
            <button
              style={resultButtonStyle}
              key={result.id}
              onClick={() => handleClubClick(result)}
            >
              {result.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
