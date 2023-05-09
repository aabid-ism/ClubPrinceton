import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/*
    The single rating component.
    @param props: the props passed to the component
                    This contains a type prom specifying which rating type this is
                    it represents.
    @return the SingleRating component
*/
export default function SingleRating(props) {
  const { type } = props;
  const clubData = useSelector((state) => state.clubData);
  const currentRatings = useSelector((state) => state.currentRatings);
  const previousRatings = useSelector((state) => state.previousRatings);
  const currentlyRating = useSelector((state) => state.currentlyRating);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  // This useEffect hook is called whenever the clubData, currentRatings, currentlyRating, previousRatings, or type variables change.
  // It sets the rating to the current rating if the user is currently rating, or the previous rating if the user is not currently rating.
  // It also sets the hover to the rating.
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

  // This function is called when the user clicks on a star.
  // It sets the rating to the index of the star that was clicked.
  // and dispatches the current rating to the redux store.
  // @param index: the index of the star that was clicked
  // @return none
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
}
