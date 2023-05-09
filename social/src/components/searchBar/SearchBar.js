import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./searchBar.css";
import api from "../auth/api";
import { useEffect } from "react";
const url = `${process.env.REACT_APP_SERVER_URL}/clubs`;
const MAX_TITLE_LENGTH = 40;

/*
  Formats the title of a club to be displayed in the search bar.
  If the title is longer than MAX_TITLE_LENGTH, it is truncated and
  an ellipsis is added to the end.

  @param title: the title of the club
  @return the formatted title

*/

function formatTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  } else {
    return title;
  }
}

/*
  The search bar component.
  Contains a search bar and a list of search results.
  @param props: the props passed to the component
  @return the SearchBar component
*/

function SearchBar(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);
  const numResults = useSelector((state) => state.numResults);

  let searchTimeout = null;

  /*
    Handles the change of the search term in the search bar.
    Fetches the search results from the backend and dispatches them to the store.
    @param event: the event that triggered the change
    @return none
  */
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
      }, 500);
    }
  };

  /* 
    Handles the click of a club in the search bar. 
    Fetches the club data from the backend and dispatches it to the store.
    @param club: the club object that was clicked
    @return none
  */

  const handleClubClick = (club) => {
    // fetch club data from backend
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

        // set global ratings
        // to be used for global rating (inital loading and automatic rerendering)
        console.log(
          "Club number of user ratings: " + data.numUserRatings
        );

        dispatch({
          type: "SET_GLOBAL_RATINGS",
          payload: {
            globalRatings: {
              numUserRatings: data.numUserRatings,
              Vibes: data.rating.Vibes,
              Clout: data.rating.Clout,
              Intensity: data.rating.Intensity,
              Inclusivity: data.rating.Inclusivity,
            },
          },
        });
        console.log("Dispatched club data:", data);
      })
      // if not logged in, redirect to login page
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("User not logged in");
          Navigate("/login");
        }
        console.log("Error occurred: ", error);
      });
  };

  return (
    <div
    >
      <div className='search-input-text'>
        <input
          type="text"
          placeholder="Search for a club!"
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

export { formatTitle };
export default SearchBar;
