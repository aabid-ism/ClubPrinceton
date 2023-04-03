import React, { useState, useEffect } from "react";
import RatingsBubble from "./RatingsBubble";
import SingleRating from "./SingleRating";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const url = "http://localhost:5050/ratings";

function UserRating() {
  const clubData = useSelector((state) => state.clubData);

  const [data, setData] = useState({
    Clout: 5,
    Intensity: 5,
    Vibes: 5,
    Inclusivity: 5,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (clubData) {
      console.log("axios was called clubData.name: " + clubData.name);
      axios
        .get(`${url}/${clubData.name}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          console.log("data was set to: " + data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [clubData]);

  const storeVibes = (rating) => {
    setData((previousState) => {
      return { ...previousState, Vibes: rating };
    });
  };

  const storeIntensity = (rating) => {
    setData((previousState) => {
      return { ...previousState, Intensity: rating };
    });
  };

  const storePopularity = (rating) => {
    setData((previousState) => {
      return { ...previousState, Clout: rating };
    });
  };

  const storeInclusivity = (rating) => {
    setData((previousState) => {
      return { ...previousState, Inclusivity: rating };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/ratings", data)
      .then((response) => {
        dispatch({
          type: "SET_CLUB_RATINGS",
          payload: { id: clubData.id, ratings: data },
        });
        // TODO: show success message to the user
      })
      .catch((error) => {
        console.error(error);
        // TODO: show error message to the user
      });
  }

  return (
    <RatingsBubble>
      <form onSubmit={handleSubmit} method="post" className="rtg-form">
        <label>Rating</label>
        <br></br>
        <label>
          <div>Good Vibes</div>
          <SingleRating
            passOnRating={storeVibes}
            initRating={data["Vibes"]}
          ></SingleRating>
        </label>
        <br></br>
        <label>
          <div>Intensity</div>
          <SingleRating
            passOnRating={storeIntensity}
            initRating={data["Intensity"]}
          ></SingleRating>
        </label>
        <br></br>
        <label>
          <div>Popularity</div>
          <SingleRating
            passOnRating={storePopularity}
            initRating={data["Clout"]}
          ></SingleRating>
        </label>
        <br></br>
        <div>Inclusivity</div>
        <SingleRating
          passOnRating={storeInclusivity}
          initRating={data["Inclusivity"]}
        ></SingleRating>

        <button type="submit">
          <strong>Submit Rating</strong>
        </button>
      </form>
    </RatingsBubble>
  );
}

export default UserRating;
