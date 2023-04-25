import React from "react";
// need to make constant?
import './clubrating.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// need to add async/await to allow concurrency
function BreakdownBubble(props){
    return (
        <div className="rtg-breakdown-bubble">
            {props.children}
        </div>
    );
}

// write this in a more javascript fashion?
function roundHundreth(value) {
    return (Math.round(value * 100) / 100).toFixed(2);
}

// gets the RGB colors for single rating
function getRGBColors(singleRating) {
    const MAX_RTG = 5;
    const MIN_RTG = 1;
    const DIFF_RTG = 4;
    const red = Math.round(255 * (MAX_RTG - singleRating)) / DIFF_RTG;
    const green = Math.round(255 * (singleRating - MIN_RTG)) / DIFF_RTG;
    return {red: red, green: green, blue: 0};
}

function SingleRating(props) {
    let cssProperties = {
        color: "rgb(" + props.rgbColor.red + "," + props.rgbColor.green +
        "," + props.rgbColor.blue +  ")"
    };

    // html tags are working but not css tags
    return (
        <strong>
            <div className="rtg-breakdown-txt">
                <div style={cssProperties}>{props.labeling}{props.singleRating}</div>
            </div>
        </strong>
    );
}

// add asynchronous await -> if needed
export function ClubRtgBreakdown() {
    // LATER: More refined coloring system
    const clubData = useSelector(state => state.clubData);
    const clubRating = useSelector(state => state.globalRatings);
    const hasOneUserRtg = useSelector(state => state.hasOneUserRtg);

    const lightblue = {red: 173, green: 216, blue: 230};
    const [ratingBreakdown, setRatingBreakdown] = 
    useState(
    {
        vibes: {rating: "N/A", color: lightblue},
        intensity: {rating: "N/A", color: lightblue},
        popularity: {rating: "N/A", color: lightblue},
        inclusivity: {rating: "N/A", color: lightblue}
    });

    useEffect(() => {
        if (clubData.name !== undefined) {
            if (hasOneUserRtg) {
                const vibesColor = {};
                

            }
            else {

            }
        }

    }, [clubData, clubRating, hasOneUserRtg]);

    /*
            clubIntensity = roundHundreth(clubRating.Intensity);
            clubPopularity = roundHundreth(clubRating.Clout);
            clubInclusivity
    */

    // let clubVibes = "NEW";
    // let clubIntensity = "NEW";
    // // clout
    // let clubPopularity = "NEW";
    // let clubInclusivity = "NEW";

    // If club has user ratings -> get RGB colors
    // let getRGBColors = (clubFactor) => {
    //     const MAX_RTG = 5;
    //     // MIN rating 1 or 0? -> EDGE CASE
    //     const MIN_RTG = 1;
    //     const DIFF_RTG = 4;
    //     const red = Math.round(255 * (MAX_RTG - clubFactor)) / DIFF_RTG;
    //     const green = Math.round(255 * (clubFactor - MIN_RTG)) / DIFF_RTG;

    //     return {red: red, green: green, blue: 0};
    // };

    // colors for lightblue background using rgb function
    // can make these consts?
    // let red = 173;
    // let green = 216;
    // let blue = 230;

    // // instead of doing this -> we should have done conditional rendering
    // // this would be the more react way -> change it post beta
    // // using props/ternary operator

    // // see if there is a better way to rewrite this logic
    // let vibesColor = {red: red, green: green, blue: blue};
    // let intensityColor = {red: red, green: green, blue: blue};
    // let popularityColor = {red: red, green: green, blue: blue};
    // let inclusivityColor = {red: red, green: green, blue: blue};

    // // { Clout: 0, Vibes: 0, Inclusivity: 0, Intensity: 0 },
    // if (clubData.name !== undefined) {
    //     if (hasOneUserRtg) {
    //         clubVibes = roundHundreth(clubRating.Vibes);
    //         clubIntensity = roundHundreth(clubRating.Intensity);
    //         clubPopularity = roundHundreth(clubRating.Clout);
    //         clubInclusivity = roundHundreth(clubRating.Inclusivity);

    //         vibesColor = getRGBColors(clubVibes);
    //         intensityColor = getRGBColors(clubIntensity);
    //         popularityColor = getRGBColors(clubPopularity);
    //         inclusivityColor = getRGBColors(clubInclusivity);
    //     }
    // }

    return (
        <BreakdownBubble>
            <div>
                <h2>Breakdown</h2>
            </div>
            <div>
                <SingleRating rgbColor={vibesColor} singleRating={clubVibes} labeling="Good Vibes: "/>
                <SingleRating rgbColor={intensityColor} singleRating={clubIntensity} labeling="Intensity: "/>
                <SingleRating rgbColor={popularityColor} singleRating={clubPopularity} labeling="Popularity: "/>
                <SingleRating rgbColor={inclusivityColor} singleRating={clubInclusivity} labeling="Inclusivity: "/>
            </div>
        </BreakdownBubble>
    );
}