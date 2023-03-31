import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./searchBar.css";

const url = "http://localhost:5050/clubs";

function SearchBar(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);
  const numResults = useSelector((state) => state.numResults);
  const clubData = useSelector((state) => state.clubData);

  const handleSearchTermChange = async (event) => {
    let searchWord = event.target.value;
    console.log(searchWord);
    console.log(`${url}/${searchWord}`);
    if (searchWord != "") {
    axios
      .get(`${url}/${searchWord}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch({
          type: "SET_RESULTS",
          payload: { results: data, numResults: data.length },
        });
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
    }
  };

  const handleClubClick = (club) => {
    console.log(`Clicked on ${club.name}`);
    axios
      .get(`${url}/a/${club.name}`)
      .then((response) => {
        const data = response.data;
        console.log("data was recieved: " + data);
        // handle club data
        dispatch({
          type: "SET_CLUB_DATA",
          payload: { clubData: data[0] },
        });
        console.log("Dispatched club data:", data[0]);
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
  };

  return (
    <div
      className="search-bar"
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchTermChange}
      />
      <p>{numResults} search results</p>
      {results.length > 0 && (
        <div className="results">
          {results.map((result) => (
            <button
              className="result-button"
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
