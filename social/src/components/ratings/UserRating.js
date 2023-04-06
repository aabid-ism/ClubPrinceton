import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./ratingstar.css";
const url = "http://localhost:5050/ratings";

function UserRating() {
  const clubData = useSelector((state) => state.clubData);
  const ratings = useSelector((state) => state.ratings);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clubData.name) {
      console.log("axios was called clubData.name: " + clubData.name);
      axios
        .get(`${url}/${clubData.name}`)
        .then((response) => {
          console.log(response.data);
          const data = response.data["rating"];
          dispatch({
            type: "GET_CLUB_RATINGS",
            payload: { ratings: data },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [clubData]);

  function handleSubmitRating(event) {
    event.preventDefault();
    console.log("submitting rating");
    console.log(ratings);
    axios
      .post(`${url}/${clubData.name}`, ratings)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <RatingsBubble>
      <form className="rtg-form" onClick={handleSubmitRating}>
        <label>Rating</label>
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

        <button type="submit">
          <strong>Submit Rating</strong>
        </button>
      </form>
    </RatingsBubble>
  );
}

const SingleRating = (props) => {
  const [hover, setHover] = useState(0);
  const ratings = useSelector((state) => state.ratings);
  
  const type = "" + props.type;

  const [rating, setRating] = useState(5);

  useEffect(() => {
    setRating(ratings[type]);
  }, [ratings]);

  const dispatch = useDispatch();

  function handleRating(index) {
    setRating(index);
    dispatch({
      type: "SET_RATING",
      payload: { type: type, rating: index },
    });
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
