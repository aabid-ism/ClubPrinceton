import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./ratingstar.css";

const url = `${process.env.REACT_APP_SERVER_URL}/ratings`;

// user rating component, bottom right of club page
function UserRating(props) {
  // get relevent data from redux store
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");
  const dispatch = useDispatch();

  // get and set previous ratings
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
  }, [clubData, currentlyRating, currentRatings]);

  // if clubData changes, reset all ratings
  useEffect(() => {
    dispatch({
      type: "RESET_ALL_RATINGS",
    });
  }, [clubData]);

  //submit the rating held in currentRatings
  function handleSubmitRating(event) {
    // add club name and user to currentRatings
    console.log("submitting rating");
    currentRatings["club"] = clubData.name;
    currentRatings["user"] = localStorage
      .getItem("user")
      ?.replaceAll(/['"]+/g, "");
    // send currentRatings to backend if windows confirm returns true
    if (
      window.confirm(
        "Are you sure you want to submit this rating? You can change it later."
      )
    ) {
      axios
        .post(`${url}/${clubData.name}/${user}`, currentRatings)
        .then((response) => {
          alert("Rating Submitted Successfully!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // set previousRatings to currentRatings
    dispatch({
      type: "SET_PREVIOUS_RATINGS",
      payload: { previousRatings: currentRatings },
    });
    // reset currentRatings
    discard();
  }

  // toggle currently rating
  function dispatchCurrentlyRating() {
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
      <form
        className="rtg-form"
        style={{ flexDirection: "column", height: "100%" }}
      >
        <div style={{ margin: "auto", height: "100%" }}>
          <div style={{ margin: "auto" }}>
            {!currentlyRating && clubData.name && (
              <strong> Your rating for {clubData.name}</strong>
            )}
            {currentlyRating && clubData.name && (
              <strong>Currently Rating {clubData.name}</strong>
            )}
          </div>
          <br></br>
          <div style={{ margin: "auto" }}>
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
          <div style={{ margin: "auto" }}>
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
                Submit a Rating
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

const SingleRating = (props) => {
  const { type } = props;
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (currentlyRating) {
      setRating(currentRatings[type] || 0);
    } else {
      setRating(previousRatings[type] || 0);
    }
    setHover(rating);
  }, [
    clubData,
    currentRatings,
    currentlyRating,
    previousRatings,
    type,
  ]);

  const dispatch = useDispatch();

  function handleRating(index) {
    if (currentlyRating) {
      setRating(index);
      dispatch({
        type: "SET_CURRENT_RATINGS",
        payload: { type: type, rating: index },
      });
    }
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleRating(index)}
            onMouseEnter={() => {
              if (currentlyRating) setHover(index);
            }}
            onMouseLeave={() => {
              if (currentlyRating) setHover(rating);
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default UserRating;
