import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./searchBar.css";
import api from "../auth/api";
import { useEffect } from "react";
const url = `${process.env.REACT_APP_SERVER_URL}/clubs`;
const MAX_TITLE_LENGTH = 40;


function formatTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  } else {
    return title;
  }
}

function SearchBar(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);
  const numResults = useSelector((state) => state.numResults);
  const clubData = useSelector((state) => state.clubData);

  let searchTimeout = null;
  const handleSearchTermChange = async (event) => {
    let searchWord = event.target.value;
    if (searchWord !== "") {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(async () => {
        try {
          const response = await api.get(`${url}/${searchWord}`);
          const data = response.data;
          dispatch({
            type: "SET_RESULTS",
            payload: { results: data, numResults: data.length },
          });
        } catch (error) {
          console.log("Error occurred: ", error);
        }
      }, 500)
    }
  };

  const handleClubClick = (club) => {
    api
      .get(`/clubs/a/${club.name}`)
      .then((response) => {
        const data = response.data[0];
        dispatch({
          type: "RESET_RATINGS",
        });
        dispatch({
          type: "SET_CLUB_DATA",
          payload: { clubData: data },
        });
        // to be used for global rating (inital loading and automatic rerendering)
        console.log("Club number of user ratings: " + data.numUserRatings);
        dispatch({
          type: "SET_GLOBAL_RATINGS",
          payload: {globalRatings: {
            numUserRatings: data.numUserRatings,
            Vibes: data.rating.Vibes,
            Clout: data.rating.Clout,
            Intensity: data.rating.Intensity,
            Inclusivity: data.rating.Inclusivity
          }}
        });
        console.log("Dispatched club data:", data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // navigate to login page
        }
        console.log("Error occurred: ", error);
      });
  };

  return (
    <div
    >
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchTermChange}
          autoFocus={true}
        />
        <p>{numResults} search results</p>
      </div>
      {results.length > 0 && (
      <div className="results">
        {results.map((result, index) => (
          <button
            className="result-button"
            key={index}
            onClick={() => handleClubClick(result)}
          >
            {formatTitle(result.name, MAX_TITLE_LENGTH)}
          </button>
        ))}
      </div>
      )}
    </div>
  );
}

export {formatTitle};
export default SearchBar;
