import React from "react";
// need to make constant?
import './clubrating.css';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";


function OvrRtgBubble(props){
    let cssProperties = {
        // forget about rgb
        // see if you can pass in red
        backgroundColor: "rgb(" + props.redColor + "," + props.greenColor +
        "," + props.blueColor +  ")"
    };
    return (
        <div className="ovr-rtg-bubble" style={cssProperties}>
            {props.children}
        </div>

    );
}

// write this in a more javascript fashion?
function roundHundreth(value) {
    return Math.round(value * 100) / 100;
}

function getRGBColors(clubRating) {
    // UPDATE: DUE TO USER FEEDBACK -> WE ARE REMOVING INTENSITY FROM OUR OVERALL RATINGS CALCULATION
    const MAX_RTG = 5;
    const MIN_RTG = 1;
    const DIFF_RTG = MAX_RTG - MIN_RTG;

    const clubClout = roundHundreth(clubRating.Clout);
    const clubVibes = roundHundreth(clubRating.Vibes);
    // const clubIntensity = roundHundreth(clubRating.Intensity);
    const clubInclusivity = roundHundreth(clubRating.Inclusivity);

    // removed intensity
    const clubRoundedRtg = `${roundHundreth((clubClout + clubVibes + clubInclusivity) / 3).toFixed(2)}`;

    const red = Math.round(200 * (MAX_RTG - clubRoundedRtg)) / DIFF_RTG;
    const green = Math.round(200 * (clubRoundedRtg - MIN_RTG)) / DIFF_RTG;
    const blue = 0;

    return {clubRoundedRtg: clubRoundedRtg, red: red, green: green, blue: blue};
}

export function OvrRating() {
    // LATER: More refined coloring system
    const clubData = useSelector(state => state.clubData);
    const clubRating = useSelector(state => state.globalRatings);
    const [overallRating, setOverallRating] = useState({clubRoundedRtg: "N/A", red: 173, green: 216, blue: 230});


    useEffect(() => {
        // increase this to > 5 later -> spamming measure
        if (clubRating.numUserRatings > 0) {
            console.log("I expect to be here after update!!")
            const newClubRating = getRGBColors(clubRating);
            setOverallRating(newClubRating);
        }
        else {
            setOverallRating({clubRoundedRtg: "NEW", red: 173, green: 216, blue: 230});
        }
    }, [clubData.name, clubRating]);

    // do we capitalize?
    return (
        <OvrRtgBubble redColor={overallRating.red} greenColor={overallRating.green} blueColor={overallRating.blue}>
            <div><h2>{`${overallRating.clubRoundedRtg}`}</h2></div>
        </OvrRtgBubble>
    );
}

