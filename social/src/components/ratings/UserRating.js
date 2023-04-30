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
  const globalRatings = useSelector((state) => state.globalRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");
  const dispatch = useDispatch();

  // get and set previous ratings
  useEffect(() => {
    if (clubData.name) {
      // axios
      //   .get(`${url}/${clubData.name}`)
      //   .then((response) => {
      //     dispatch({
      //       type: "SET_GLOBAL_RATINGS",
      //       payload: { globalRatings: response.data },
      //     });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
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
  // made this an async/await function
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

      // right before axios request to submit current ratings to backend:
      // let's include the dynamic rendering here!
      // keeping this outside of the if statement in case something goes awry
      // will refactor for concision and clarity
      const updatedClubRating = {
        numUserRatings: -1,
        Vibes: clubData.Vibes - 1,
        Clout: 1,
        Intensity: 1,
        Inclusivity: 1
      };
      if (globalRatings.numUserRatings !== undefined) {
        if (previousRatings.Vibes === 0) {
          // adding a new user rating to new overall average
          // need to do this because the initialization for club rating in the database is set to 1
          // change it to zero once database is wiped
          if (globalRatings.numUserRatings === 0) {
            console.log("I expect to be here please!");
            // your first rating for a club that has not been rated by others
            updatedClubRating.Vibes = currentRatings.Vibes;
            updatedClubRating.Clout = currentRatings.Clout;
            updatedClubRating.Intensity = currentRatings.Intensity;
            updatedClubRating.Inclusivity = currentRatings.Inclusivity;
            updatedClubRating.numUserRatings = 1;
            console.log("Finished my assignments");
          }
          else {
            // your first rating for our club that has already been rated by others
            updatedClubRating.Vibes = ((globalRatings.Vibes * globalRatings.numUserRatings) + currentRatings.Vibes) / (globalRatings.numUserRatings + 1);
            updatedClubRating.Clout = ((globalRatings.Clout * globalRatings.numUserRatings) + currentRatings.Clout) / (globalRatings.numUserRatings + 1);
            updatedClubRating.Intensity = ((globalRatings.Intensity * globalRatings.numUserRatings) + currentRatings.Intensity) / (globalRatings.numUserRatings + 1);
            updatedClubRating.Inclusivity = ((globalRatings.Inclusivity * globalRatings.numUserRatings) + currentRatings.Inclusivity) / (globalRatings.numUserRatings + 1);
            updatedClubRating.numUserRatings = globalRatings.numUserRatings + 1;
          }
        }
        else {
          // updating a previous user rating to new overall average
          console.log("Previous Ratings Vibes14: " + JSON.stringify(previousRatings.Vibes));
          console.log("Current Ratings Vibes14: " + JSON.stringify(currentRatings.Vibes));
          console.log("Number of user ratings14: " + JSON.stringify(clubData.numUserRatings));
          console.log("Club Rating old average Vibes14: " + JSON.stringify(clubData.rating.Vibes));
          console.log("Global ratings of old average Vibes14: " + JSON.stringify(globalRatings.Vibes));

          // removing clubData and replacing with globalratings
          updatedClubRating.Vibes = ((globalRatings.Vibes * globalRatings.numUserRatings) - previousRatings.Vibes + currentRatings.Vibes) / (clubData.numUserRatings);
          updatedClubRating.Clout = ((globalRatings.Clout * globalRatings.numUserRatings) - previousRatings.Clout + currentRatings.Clout) / (clubData.numUserRatings);
          updatedClubRating.Intensity = ((globalRatings.Intensity * globalRatings.numUserRatings) - previousRatings.Intensity + currentRatings.Intensity) / (clubData.numUserRatings);
          updatedClubRating.Inclusivity = ((globalRatings.Inclusivity * globalRatings.numUserRatings) - previousRatings.Inclusivity + currentRatings.Inclusivity) / (clubData.numUserRatings);
          updatedClubRating.numUserRatings = globalRatings.numUserRatings;
        }
      }

      dispatch({
        type: "SET_GLOBAL_RATINGS",
        payload: { globalRatings: updatedClubRating }
      });

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
              >
                Update Rating
              </button>
            )}
            {!currentlyRating && previousRatings["Vibes"] === 0 && (
              <button
                className="rating-button"
                onClick={dispatchCurrentlyRating}
              >
                Submit a Rating
              </button>
            )}
            {currentlyRating && (
              <div>
                <button
                  className="rating-button"
                  onClick={handleSubmitRating}
                >
                  Submit Your Rating
                </button>
                <button className="rating-button" onClick={discard}>
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
