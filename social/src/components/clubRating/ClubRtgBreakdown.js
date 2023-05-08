import React from "react";
// need to make constant?
import "./clubrating.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "../auth/api";

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
function getRGBColors(singleRating, ratingType=null) {
  // error -> should not enter here
  if (singleRating < 1) {
    console.error("Rating factor of Club Rating is less than one");
    // return;
  }
  const MAX_RTG = 5;
  const MIN_RTG = 1;

  if (ratingType === "intensity") {
    return {red: 128, green: 128, blue: 128};
    // singleRating = MAX_RTG - singleRating + MIN_RTG;
  }

  const DIFF_RTG = 4;
  // originally 255
  // changed to 200 -> to dull brightness
  const red = Math.round(200 * (MAX_RTG - singleRating)) / DIFF_RTG;
  const green = Math.round(200 * (singleRating - MIN_RTG)) / DIFF_RTG;
  return { red: red, green: green, blue: 0 };
}

function SingleRating({rgbColor, adverb, labeling}) {
  let cssProperties = (rgbColor) => {
    return {color:
      "rgb(" +
      rgbColor.red + "," + 
      rgbColor.green + "," + 
      rgbColor.blue + ")",}
  };

  return (
      <div>
        <div>
          <strong>People say this club 
            <span style={cssProperties(rgbColor.vibesColor)}>{adverb.vibesAdverb} {labeling.vibesLabel}</span>,
            <span style={cssProperties(rgbColor.popularityColor)}>{adverb.popularAdverb} {labeling.popularLabel}</span>,
            <span style={cssProperties(rgbColor.inclusiveColor)}>{adverb.inclusiveAdverb} {labeling.inclusiveLabel}</span>, and
            <span style={cssProperties(rgbColor.intensityColor)}>{adverb.intenseAdverb} {labeling.intensityLabel}</span>.
          </strong>
        </div>
      </div>
  );
}

const adverbSelector = (singleRtg, ratingType) => {

  // very, moderately, not so, not
  let chosenAdverb = "";
  switch (true) {
    case (singleRtg >= 4.00 && singleRtg <= 5.00):
      if (ratingType === "vibes") return chosenAdverb = " has great ";
      return chosenAdverb = " is very ";

    case (singleRtg >= 3.00 && singleRtg < 4.00):
      if (ratingType === "vibes") return chosenAdverb = " has good ";
      return chosenAdverb = " is moderately ";

    case (singleRtg >= 2.00 && singleRtg < 3.00):
      if (ratingType === "vibes") return chosenAdverb = " has ok ";
      return chosenAdverb = " is not so ";

    case (singleRtg >= 1.00 && singleRtg < 2.00):
      if (ratingType === "vibes") return chosenAdverb = " has bad ";
      return chosenAdverb = " is not ";

    default:
      console.error("Error in adverb rating breakdown");
      if (ratingType === "vibes") return chosenAdverb = " has great ";
      chosenAdverb = " is very ";
  }
  return chosenAdverb;
}



// add asynchronous await -> if needed
export function ClubRtgBreakdown({width, height}) {
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
        // need to increase quota -> prevent spamming
        if (clubRating.numUserRatings > 0) {
            
            const vibesColor = getRGBColors(clubRating.Vibes);
            const intensityColor = getRGBColors(clubRating.Intensity, "intensity");
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
    }, [clubData.name, clubRating]);
    // clubData, clubRating

  return (
    <BreakdownBubble>
      <div>
        <h2>Breakdown</h2>
      </div>
      {clubData.numUserRatings > 0 &&
        <div className="rtg-collection">
          <SingleRating
            rgbColor={{vibesColor: ratingBreakdown.vibes.color,
              popularityColor: ratingBreakdown.popularity.color,
              inclusiveColor: ratingBreakdown.inclusivity.color,
              intensityColor: ratingBreakdown.intensity.color}}
            adverb={{vibesAdverb: adverbSelector(ratingBreakdown.vibes.rating, "vibes"),
                    popularAdverb: adverbSelector(ratingBreakdown.popularity.rating, "popular"),
                    inclusiveAdverb: adverbSelector(ratingBreakdown.inclusivity.rating, "inclusive"),
                    intenseAdverb: adverbSelector(ratingBreakdown.intensity.rating, "intense")}}
            labeling={{vibesLabel: "vibes",
                      popularLabel: "popular",
                      inclusiveLabel: "inclusive",
                      intensityLabel: "intensive"}}
          />
          {/* <SingleRating
            rgbColor={ratingBreakdown.intensity.color}
            adverb={adverbSelector(ratingBreakdown.intensity.rating, "intense")}
            labeling="intense"
          />
          <SingleRating
            rgbColor={ratingBreakdown.popularity.color}
            adverb={adverbSelector(ratingBreakdown.popularity.rating, "popular")}
            labeling="popular"
          />
          <SingleRating
            rgbColor={ratingBreakdown.inclusivity.color}
            adverb={adverbSelector(ratingBreakdown.inclusivity.rating, "inclusive")}
            labeling="inclusive"
          /> */}
        </div>
      }
      {
        clubData.numUserRatings === 0 && 
        <div className="no-rtg-breakdown">
          <div>Nothing</div>
          <div>to see here!</div>
        </div>
      }
    </BreakdownBubble>
  );
}
