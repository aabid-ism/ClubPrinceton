import React, { useState } from 'react';
import '/Users/aditya/Library/CloudStorage/OneDrive-PrincetonUniversity/Computer Science/Spring 2023/COS333/ClubPrinceton/social/src/components/ratings/ratingstar.css';
// need to change the dimensions of the star
// citation?
const SingleRating = (props) => {
  // setRating is never used -> b/c passed to parent component
  // isSetHover to zero correct?
  const [rating, setRating] = useState(props.initRating);
  const [hover, setHover] = useState(0);
  // props.vibesRating(rating)
  // console.log(rating)
  // temporary -> see if you can do useEffect
  function handleRating(index) {
    setRating(index)
    props.passOnRating(index)
  }
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={(index <= (hover || rating)) ? "on" : "off"}
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

export default SingleRating;