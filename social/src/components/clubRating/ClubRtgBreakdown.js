import React from "react";
// need to make constant?
import './clubrating.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BreakdownBubble(props){
    return (
        <div className="rtg-breakdown-bubble">
            {props.children}
        </div>
    );
}

// write this in a more javascript fashion?
function roundHundreth(value) {
    return Math.round(value * 100) / 100;
}

function RatingFactor(props) {
    console.log("Vibes rating: " + props.singleRating);
    console.log("RGB Colors for red: " + props.rgbColor.red);
    let cssProperties = {
        color: "rgb(" + props.rgbColor.red + "," + props.rgbColor.green +
        "," + props.rgbColor.blue +  ")"
    };

    // html tags are working but not css tags
    return (
        <strong><br></br><div style={cssProperties}>{props.labeling}{props.singleRating}</div></strong>
    );
}

export function ClubRtgBreakdown() {
    // LATER: BETTER REACT CODE -> UPDATE to USEEFFECT -> do the same for announcements
    // BUG: RERENDERING MULTIPLE TIMES (5 or 6) instead of just once
    // LATER: More refined coloring system
    const clubData = useSelector(state => state.clubData);
    const clubRating = useSelector(state => state.globalRatings);
    const hasOneUserRtg = useSelector(state => state.hasOneUserRtg);

    console.log("Does this club have at least one user rating? " + hasOneUserRtg);

    let clubVibes = "NEW";
    let clubIntensity = "NEW";
    // clout
    let clubPopularity = "NEW";
    let clubInclusivity = "NEW";

    // If club has user ratings -> get RGB colors
    let getRGBColors = (clubFactor) => {
        const MAX_RTG = 5;
        // MIN rating 1 or 0? -> EDGE CASE
        const MIN_RTG = 1;
        const DIFF_RTG = 4;
        const red = Math.round(255 * (MAX_RTG - clubFactor)) / DIFF_RTG;
        const green = Math.round(255 * (clubFactor - MIN_RTG)) / DIFF_RTG;

        return {red: red, green: green, blue: 0};
    };

    // colors for lightblue background using rgb function
    // can make these consts?
    let red = 173;
    let green = 216;
    let blue = 230;

    // instead of doing this -> we should have done conditional rendering
    // this would be the more react way -> change it post beta
    // using props/ternary operator

    // see if there is a better way to rewrite this logic
    let vibesColor = {red: red, green: green, blue: blue};
    let intensityColor = {red: red, green: green, blue: blue};
    let popularityColor = {red: red, green: green, blue: blue};
    let inclusivityColor = {red: red, green: green, blue: blue};

    // { Clout: 0, Vibes: 0, Inclusivity: 0, Intensity: 0 },
    if (clubData.name !== undefined) {
        if (hasOneUserRtg) {
            clubVibes = roundHundreth(clubRating.Vibes);
            clubIntensity = roundHundreth(clubRating.Intensity);
            clubPopularity = roundHundreth(clubRating.Clout);
            clubInclusivity = roundHundreth(clubRating.Inclusivity);

            vibesColor = getRGBColors(clubVibes);
            intensityColor = getRGBColors(clubIntensity);
            popularityColor = getRGBColors(clubPopularity);
            inclusivityColor = getRGBColors(clubInclusivity);
        }
    }

    console.log("VIBES COLORING: " + JSON.stringify(vibesColor));


    return (
        <BreakdownBubble>
            <div className="rtg-breakdown-txt">
                <RatingFactor rgbColor={vibesColor} singleRating={clubVibes} labeling="Good Vibes: "></RatingFactor>
                <RatingFactor rgbColor={intensityColor} singleRating={clubIntensity} labeling="Intensity: "></RatingFactor>
                <RatingFactor rgbColor={popularityColor} singleRating={clubPopularity} labeling="Popularity: "></RatingFactor>
                <RatingFactor rgbColor={inclusivityColor} singleRating={clubInclusivity} labeling="Inclusivity: "></RatingFactor>
            </div>
        </BreakdownBubble>
    );
}