import React, { useState } from "react";
import RatingStars from "./RatingStars";

// To-Do: handle case with 

function UserRating() {
    // To-DO -> values and setData not used
    const [data, setData] = useState({
        goodVibes: 2,
        intensity: 5,
        popularity: 3,
        inclusivity: 4,
      });
    
      function handleSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(data, undefined, 2))
      }
    
    return (
        // handle widths
        <form onSubmit={handleSubmit}>
            <label>
                <div>Good Vibes</div>
                <RatingStars></RatingStars>
            </label>
            <label>
                <div>Intensity</div>
                <RatingStars></RatingStars>
            </label>
            <label>
                <div>Popularity</div>
                <RatingStars></RatingStars>
            </label>
            <label>
                <div>Inclusivity</div>
                <RatingStars></RatingStars>
            </label>
        </form>
    );
}

export default UserRating;