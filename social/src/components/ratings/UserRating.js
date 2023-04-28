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
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");
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
          // console.log("Previous rating recieved: " + response.data);
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

  useEffect(() => {
    dispatch({
      type: "RESET_ALL_RATINGS",
    });
  }, [clubData]);

  // make this async/await?
  function handleSubmitRating(event) {
    console.log("submitting rating");
    currentRatings["club"] = clubData.name;
    currentRatings["user"] = localStorage
      .getItem("user")
      ?.replaceAll(/['"]+/g, "");

    // set club data here!!! -> prior to posting to ratings endpoint
    console.log("club documentI: " + JSON.stringify(clubData));
    console.log("current user ratingi: " + JSON.stringify(currentRatings));



    // look into async await
    // currentRating submitted by the user
    // club's overall rating currently
    // numUserRatings for the Club + 1



    // Optimizations: Refactor the below code due to repeated operations, send back newly defined averages
    // to the backend instead of recomputing again in the backend
    // also maybe send back updated numUserRatings as well
    // clubData.rating.Clout = (clubData.rating.Clout + currentRatings.Clout) / (clubData.numUserRatings + 1);
    // clubData.rating.Vibes = (clubData.Vibes + currentRatings.Vibes) / (clubData.numUserRatings + 1);
    // clubData.rating.Inclusivity = (clubData.Inclusivity + currentRatings.Inclusivity) / (clubData.numUserRatings + 1);
    // clubData.rating.Intensity = (clubData.rating.Intensity + currentRatings.Intensity) / (clubData.numUserRatings + 1);
    

    clubData.rating.Clout = 2.70;
    clubData.rating.Vibes = 2.70;
    clubData.rating.Inclusivity = 2.70;
    clubData.rating.Intensity = 2.70;
    // console.error("Error is here!");

    // await async?
    dispatch({
      type: "SET_CLUB_DATA",
      payload: { clubData: clubData },
    });



    // for now -> to test with dummy data -> subsitute with current rating

    // set the club data with the current rating

    // dispatch to store afterwards

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
        {currentlyRating && (
          <strong style={{ padding: "12px" }} onClick={discard}>
            Discard
          </strong>
        )}
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
    setRating(index);
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
