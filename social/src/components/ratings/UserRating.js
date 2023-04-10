import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./ratingstar.css";
const url = "http://localhost:5050/ratings";

function UserRating() {
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clubData.name) {
      axios
        .get(`${url}/${clubData.name}`)
        .then((response) => {
          const data = response.data["rating"];
          dispatch({
            type: "SET_GLOBAL_RATINGS",
            payload: { globalRatings: data },
          });
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`${url}/${clubData.name}/roy`)
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
  }, [clubData]);

  function handleSubmitRating(event) {
    console.log("submitting rating");
    currentRatings["club"] = clubData.name;
    currentRatings["user"] = "roy";

    axios
      .post(`${url}/${clubData.name}`, currentRatings)
      .then((response) => {
        console.log(response.data);
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
    <RatingsBubble>
      <form className="rtg-form">
        {!currentlyRating && clubData.name && (
          <strong>Global Rating for {clubData.name}</strong>
        )}
        {currentlyRating && clubData.name && (
          <strong>Currently Rating {clubData.name}</strong>
        )}

        <br></br>
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

        {!currentlyRating && previousRatings["Vibes"] > 0 && (
          <strong onClick={dispatchCurrentlyRating}>
            Update Rating
          </strong>
        )}
        {!currentlyRating && previousRatings["Vibes"] === 0 && (
          <strong onClick={dispatchCurrentlyRating}>
            Submit a Rating
          </strong>
        )}
        {currentlyRating && (
          <strong onClick={handleSubmitRating}>
            Submit Your Rating
          </strong>
        )}
        {currentlyRating && <strong onClick={discard}>Discard </strong>}
      </form>
    </RatingsBubble>
  );
}

const SingleRating = (props) => {
  const [hover, setHover] = useState(0);
  const currentRatings = useSelector((state) => state.currentRatings);
  const globalRatings = useSelector((state) => state.globalRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);

  const type = "" + props.type;

  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (globalRatings[type] > 0 && !currentlyRating) {
      setRating(globalRatings[type]);
    } else if (currentRatings[type] > 0 && currentlyRating) {
      setRating(currentRatings[type]);
    } else if (
      currentlyRating &&
      previousRatings[type] > 0 &&
      currentRatings[type] == 0
    ) {
      setRating(previousRatings[type]);
    } else if (currentlyRating && currentRatings[type] == 0) {
      setRating(0);
    } else if (currentlyRating && currentRatings[type] > 0) {
      setRating(currentRatings[type]);
    }
    setHover(rating);
  }, [globalRatings, currentRatings, currentlyRating]);

  const dispatch = useDispatch();

  function handleRating(index) {
    if (currentlyRating) {
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
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default UserRating;
