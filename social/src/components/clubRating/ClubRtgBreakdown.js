import React from "react";
// need to make constant?
import "./clubrating.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "../auth/api";

/*
Either refactor OvrRating and ClubRtgBreakdown
or get state management to work on fast clicking
on fast clicking (sometimes doesn't have to be fast)
- one of the properties gets undefined
Ratings state for zero ratings and non zero ratings are defined differently
- shouldn't even be going into that condition -> debug later if have time
Right now code is working -> but making an unecessary API CALL
*/

// testing -> consider exceptions

// need to add async/await to allow concurrency
function BreakdownBubble(props) {
  return (
    <div
      className="rtg-breakdown-bubble"
      style={{ width: props.width, height: props.height }}
    >
      {props.children}
    </div>
  );
}

// write this in a more javascript fashion?
function roundHundreth(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

// gets the RGB colors for single rating
// can refactor
function getRGBColors(singleRating) {
  // error -> should not enter here
  if (singleRating < 1) {
    console.error("Rating factor of Club Rating is less than one");
    // return;
  }
  const MAX_RTG = 5;
  const MIN_RTG = 1;
  const DIFF_RTG = 4;
  const red = Math.round(255 * (MAX_RTG - singleRating)) / DIFF_RTG;
  const green = Math.round(255 * (singleRating - MIN_RTG)) / DIFF_RTG;
  return { red: red, green: green, blue: 0 };
}

function SingleRating(props) {
  let cssProperties = {
    color:
      "rgb(" +
      props.rgbColor.red +
      "," +
      props.rgbColor.green +
      "," +
      props.rgbColor.blue +
      ")",
  };

  return (
    <strong>
      <div>
        <div style={cssProperties}>
          {props.labeling}
          {props.singleRating}
        </div>
      </div>
    </strong>
  );
}

// add asynchronous await -> if needed
export function ClubRtgBreakdown({}) {
  const checkUserRtgUrl = `${process.env.REACT_APP_SERVER_URL}/clubRating/check`;
  // LATER: More refined coloring system
  const clubData = useSelector((state) => state.clubData);
  const clubRating = useSelector((state) => state.globalRatings);
  // const hasOneUserRtg = useSelector(state => state.hasOneUserRtg);

  const lightblue = { red: 173, green: 216, blue: 230 };
  // keeping the initial state of N/A -> to see if there are any errors in useEffect
  const [ratingBreakdown, setRatingBreakdown] = useState({
    vibes: { rating: "N/A", color: lightblue },
    intensity: { rating: "N/A", color: lightblue },
    popularity: { rating: "N/A", color: lightblue },
    inclusivity: { rating: "N/A", color: lightblue },
  });

    useEffect(() => {
        // if (clubData.name !== undefined) {
        // api
        // .get(checkUserRtgUrl, {
        //     params: {clubName: clubData.name}
        // })
        // .then((response) => {
        //     const hasUserRating= response.data.hasUserRating;
        if (clubRating.numUserRatings > 0) {
            
            const vibesColor = getRGBColors(clubRating.Vibes);
            const intensityColor = getRGBColors(clubRating.Intensity);
            const popularityColor = getRGBColors(clubRating.Clout);
            const inclusivityColor = getRGBColors(clubRating.Inclusivity);

            const vibesRating = roundHundreth(clubRating.Vibes);
            const intensityRating = roundHundreth(clubRating.Intensity);
            const popularityRating = roundHundreth(clubRating.Clout);
            const inclusivityRating = roundHundreth(clubRating.Inclusivity);

            setRatingBreakdown(
            {
                vibes: {rating: `${vibesRating}`, color: vibesColor},
                intensity: {rating: `${intensityRating}`, color: intensityColor},
                popularity: {rating: `${popularityRating}`, color: popularityColor},
                inclusivity: {rating: `${inclusivityRating}`, color: inclusivityColor}
            });
        }
        else {
            setRatingBreakdown({
                vibes: {rating: "NEW", color: lightblue},
                intensity: {rating: "NEW", color: lightblue},
                popularity: {rating: "NEW", color: lightblue},
                inclusivity: {rating: "NEW", color: lightblue}
            });
        }
        // })
        // .catch((error) => {
        //     console.log("Error occurred: ", error);
        // });
    }, [clubData.name, clubRating]);
    // clubData, clubRating

  return (
    <BreakdownBubble>
      <div>
        <h2>Breakdown</h2>
      </div>
      <div className="rtg-collection">
        <SingleRating
          rgbColor={ratingBreakdown.vibes.color}
          singleRating={ratingBreakdown.vibes.rating}
          labeling="Good Vibes: "
        />
        <SingleRating
          rgbColor={ratingBreakdown.intensity.color}
          singleRating={ratingBreakdown.intensity.rating}
          labeling="Intensity: "
        />
        <SingleRating
          rgbColor={ratingBreakdown.popularity.color}
          singleRating={ratingBreakdown.popularity.rating}
          labeling="Popularity: "
        />
        <SingleRating
          rgbColor={ratingBreakdown.inclusivity.color}
          singleRating={ratingBreakdown.inclusivity.rating}
          labeling="Inclusivity: "
        />
      </div>
    </BreakdownBubble>
  );
}
