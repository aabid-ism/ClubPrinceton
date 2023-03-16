import React, { useState } from "react";
import SingleRating from "./SingleRating";

// To-Do: handle case with 

function UserRating(props) {
    // To-DO -> values and setData not used
    // need to preserve the state of the ratings
    // rerender -> with previous ratings of user if available -> if not set with all zeroes
    // take adv -> of the initialization stage
    // do error handling
    // the question is now -> how do I set data from the server to client side
    // test on dummy data -> receiving 0,0,0,0 (never rated this club page)
    // 1, 1, 2, 4
    const [data, setData] = useState({
        goodVibes: 0,
        intensity: 0,
        popularity: 0,
        inclusivity: 0,
        clubName: 'Triangle Club'
      });
    console.log(data.goodVibes)
    console.log(data.intensity)
    console.log(data.popularity)
    console.log(data.inclusivity)

    // does every state need to updated like this to pass data from child to parent?
    // find better alternative later!!! -> once more comfortable with React
    const storeVibes = (rating) => {
        setData(previousState => {
            return { ...previousState, goodVibes: rating }
        });
    };

    const storeIntensity = (rating) => {
        setData(previousState => {
            return { ...previousState, intensity: rating }
        });
    };

    const storePopularity = (rating) => {
        setData(previousState => {
            return { ...previousState, popularity: rating }
        });
    };

    const storeInclusivity = (rating) => {
        setData(previousState => {
            return { ...previousState, inclusivity: rating }
        });
    };
    
      function handleSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(data, undefined, 2))
      }
    
    return (
        // handle widths?
        // form attributes?
        // need to center title
        // button should change to update rating on click
        <form 
            onSubmit={handleSubmit}
            method="post"
        >
            <label>Rating</label>
            <br></br>
            <label>
                <div>Good Vibes</div>
                <SingleRating passOnRating={storeVibes}></SingleRating>
            </label>
            <br></br>
            <label>
                <div>Intensity</div>
                <SingleRating passOnRating={storeIntensity}></SingleRating>
            </label>
            <br></br>
            <label>
                <div>Popularity</div>
                <SingleRating passOnRating={storePopularity}></SingleRating>
            </label>
            <br></br>
                <div>Inclusivity</div>
                <SingleRating passOnRating={storeInclusivity}></SingleRating>

            <button type="submit">Submit Rating</button>
        </form>
    );
}

export default UserRating;