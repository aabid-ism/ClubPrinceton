import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./ratingstar.css";
import api from "../auth/api";
import SingleRating from "./SingleRating";
const url = `${process.env.REACT_APP_SERVER_URL}/ratings`;

/*
  The user rating component. 
  Contains the form for the user to rate a club.
  @param props: the props passed to the component. This shall contain
                 the width and height of the component
  @return the UserRating component
*/
function UserRating(props) {
  // get relevent data from redux store
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const globalRatings = useSelector((state) => state.globalRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");
  const dispatch = useDispatch();

  // get previous ratings from backend and dispatch to redux store
  // everytime the user submits a rating, the previous rating is updated
  // the global rating of a club changes, or the user selects a new club
  useEffect(() => {
    if (clubData.name) {
      api
        .get(`${url}/${clubData.name}/${user}`)
        .then((response) => {
          console.log("Previous rating recieved: " + response.data);
          const data = response.data;
          dispatch({
            type: "SET_PREVIOUS_RATINGS",
            payload: { previousRatings: data },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    globalRatings.numUserRatings,
    clubData,
    currentlyRating,
    currentRatings,
  ]);

  // if clubData changes, reset all ratings
  useEffect(() => {
    dispatch({
      type: "RESET_ALL_RATINGS",
    });
  }, [clubData]);

  // submit rating to backend and update global rating of club in database
  function handleSubmitRating(event) {
    // add club name and user to currentRatings
    console.log("submitting rating");
    currentRatings["club"] = clubData.name;
    currentRatings["user"] = localStorage
      .getItem("user")
      ?.replaceAll(/['"]+/g, "");

    // check if all rating categories have a non-zero value
    const hasNonZeroValues = Object.values(currentRatings).every(
      (value) => value !== 0
    );
    // if not, alert the user and return
    if (!hasNonZeroValues) {
      alert("Please provide a rating for all categories.");
      dispatchCurrentlyRating();
      return;
    }

    // send currentRatings to backend if windows confirm returns true
    const submit = window.confirm(
      "Are you sure you want to submit this rating? You can change it later."
    );
    if (submit) {
      const updatedClubRating = {
        numUserRatings: -1,
        Vibes: 1,
        Clout: 1,
        Intensity: 1,
        Inclusivity: 1,
      };
      const ratingFactors = [
        "Vibes",
        "Clout",
        "Intensity",
        "Inclusivity",
      ];
      if (previousRatings.Vibes === 0) {
        // adding a new user rating to new overall average
        // need to do this because the initialization for club rating in the database is set to 1
        if (globalRatings.numUserRatings === 0) {
          updatedClubRating.numUserRatings = 1;
          ratingFactors.forEach((rating) => {
            updatedClubRating[rating] = currentRatings[rating];
          });
          // console.log("Finished my assignments");
        } else {
          // adding a new user rating for a club that has been previously rated
          updatedClubRating.numUserRatings =
            globalRatings.numUserRatings + 1;

          ratingFactors.forEach((rating) => {
            updatedClubRating[rating] =
              (globalRatings[rating] * globalRatings.numUserRatings +
                currentRatings[rating]) /
              (globalRatings.numUserRatings + 1);
          });
        }
      } else {
        // updating a previous user rating to new overall average
        updatedClubRating.numUserRatings = globalRatings.numUserRatings;

        ratingFactors.forEach((rating) => {
          updatedClubRating[rating] =
            (globalRatings[rating] * globalRatings.numUserRatings -
              previousRatings[rating] +
              currentRatings[rating]) /
            globalRatings.numUserRatings;
        });
      }
      // post request to backend to update club rating
      api
        .post(`${url}/${clubData.name}/${user}`, {
          currentUserRatings: currentRatings,
          updatedClubRating: updatedClubRating,
        })
        .then((response) => {
          alert("Rating Submitted Successfully!");
          dispatch({
            type: "SET_GLOBAL_RATINGS",
            payload: { globalRatings: updatedClubRating },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // if the user cancels, reset the state of currentRatings to what it
      // was before the user made any changes
      dispatch({
        type: "SET_CURRENTLY_RATING",
        payload: { currentlyRating: true },
      });
      discard();
      return;
    }

    // after pressing submit
    // set previousRatings to currentRatings
    dispatch({
      type: "SET_PREVIOUS_RATINGS",
      payload: { previousRatings: currentRatings },
    });

    // reset currentlyRating
    dispatchCurrentlyRating();
  }

  // toggle currently rating
  function dispatchCurrentlyRating() {
    discard();
    dispatch({
      type: "SET_CURRENTLY_RATING",
      payload: { currentlyRating: !currentlyRating },
    });
  }

  // discard current rating that the user is entering in phase 2
  function discard() {
    dispatch({
      type: "SET_CURRENTLY_RATING",
      payload: { currentlyRating: false },
    });
    // reset currentRatings to 0
    dispatch({
      type: "SET_CURRENT_RATINGS_ALL",
      payload: {
        currentRatings: {
          Clout: 0,
          Vibes: 0,
          Inclusivity: 0,
          Intensity: 0,
        },
      },
    });
  }

  return (
    <RatingsBubble>
      <form className="rtg-form">
        <div>
          <div>
            {!currentlyRating && clubData.name && (
              <strong> Your rating for {clubData.name}</strong>
            )}
            {currentlyRating && clubData.name && (
              <strong>Currently Rating {clubData.name}</strong>
            )}
          </div>
          <br></br>
          <div>
            <label>
              <div>Good Vibes</div>
              <SingleRating type="Vibes"></SingleRating>
            </label>
            <br></br>
            <label>
              <div>Intensity</div>
              <SingleRating type="Intensity"></SingleRating>
            </label>
            <br></br>
            <label>
              <div>Popularity</div>
              <SingleRating type="Clout"></SingleRating>
            </label>
            <br></br>
            <div>Inclusivity</div>
            <SingleRating type="Inclusivity"></SingleRating>
          </div>
          <br></br>
          <div>
            {!currentlyRating && previousRatings["Vibes"] > 0 && (
              <button
                className="rating-button"
                onClick={dispatchCurrentlyRating}
                style={{
                  backgroundColor: "#FF8C00",
                  border: "none",
                  color: "white",
                  padding: "8px 16px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transitionDuration: "0.4s",
                }}
              >
                Update Rating
              </button>
            )}
            {!currentlyRating && previousRatings["Vibes"] === 0 && (
              <button
                className="rating-button"
                onClick={dispatchCurrentlyRating}
                style={{
                  backgroundColor: "#FF8C00",
                  border: "none",
                  color: "white",
                  padding: "8px 16px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transitionDuration: "0.4s",
                }}
              >
                Click to Start Rating!
              </button>
            )}
            {currentlyRating && (
              <div>
                <button
                  className="rating-button"
                  onClick={handleSubmitRating}
                  style={{
                    backgroundColor: "#FF8C00",
                    border: "none",
                    color: "white",
                    padding: "8px 16px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transitionDuration: "0.4s",
                  }}
                >
                  Submit Your Rating
                </button>
                <button
                  className="rating-button"
                  onClick={discard}
                  style={{
                    backgroundColor: "#FF8C00",
                    border: "none",
                    color: "white",
                    padding: "8px 16px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transitionDuration: "0.4s",
                  }}
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </RatingsBubble>
  );
}

export default UserRating;
