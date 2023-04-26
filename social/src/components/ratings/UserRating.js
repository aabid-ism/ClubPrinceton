import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./ratingstar.css";

const url = `${process.env.REACT_APP_SERVER_URL}/ratings`;

function UserRating(props) {
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (clubData.name) {
      axios
        .get(`${url}/${clubData.name}`)
        .then((response) => {
          dispatch({
            type: "SET_GLOBAL_RATINGS",
            payload: { globalRatings: response.data },
          });
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`${url}/${clubData.name}/${user}`)
        .then((response) => {
          console.log("Previous rating received: " + response.data);
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
  }, [clubData, currentlyRating, currentRatings, user, dispatch]);

  useEffect(() => {
    dispatch({
      type: "RESET_ALL_RATINGS",
    });
  }, [clubData, dispatch]);

  function handleSubmitRating(event) {
    event.preventDefault();
    console.log("submitting rating");
    currentRatings["club"] = clubData.name;
    currentRatings["user"] = user;

    axios
      .post(`${url}/${clubData.name}/${user}`, currentRatings)
      .then((response) => {
        alert("Rating Submitted Successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
    discard();
  }

  function dispatchCurrentlyRating() {
    dispatch({
      type: "SET_CURRENTLY_RATING",
      payload: { currentlyRating: !currentlyRating },
    });
  }

  function discard() {
    dispatch({
      type: "SET_CURRENTLY_RATING",
      payload: { currentlyRating: false },
    });
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
    <RatingsBubble width={props.width} height={props.height}>
      <form className="rtg-form">
        {!currentlyRating && clubData.name && (
          <strong> Your rating for {clubData.name}</strong>
        )}
        {currentlyRating && clubData.name && (
          <strong>Currently Rating {clubData.name}</strong>
        )}
        <br></br>
        <label>
          <div>Good Vibes</div>
          <SingleRating type="Vibes" />
        </label>
        <br></br>
        <label>
          <div>Intensity</div>
          <SingleRating type="Intensity" />
        </label>
        <br></br>
        <label>
          <div>Popularity</div>
          <SingleRating type="Clout" />
        </label>
        <br></br>
        <div>Inclusivity</div>
        <SingleRating type="Inclusivity" />
        {!currentlyRating && previousRatings["Vibes"] > 0 && (
          <button type="button" onClick={dispatchCurrentlyRating}>
            Update Rating
          </button>
        )}
        {!currentlyRating && previousRatings["Vibes"] === 0 && (
          <button type="button" onClick={dispatchCurrentlyRating}>
            Submit a Rating
          </button>
        )}
        {currentlyRating && (
          <button type="button" onClick={handleSubmitRating}>
            Submit Your Rating
          </button>
        )}
        {currentlyRating && (
          <strong style={{ padding: "12px" }} onClick={discard}>
            Discard
          </strong>
        )}
      </form>
    </RatingsBubble>
  );
}
