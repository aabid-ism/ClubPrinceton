import React from "react";
// need to make constant?
import './clubrating.css';
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import api from "../auth/api";
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
    const MAX_RTG = 5;
    const MIN_RTG = 1;
    const DIFF_RTG = MAX_RTG - MIN_RTG;

    const clubClout = roundHundreth(clubRating.Clout);
    const clubVibes = roundHundreth(clubRating.Vibes);
    const clubIntensity = roundHundreth(clubRating.Intensity);
    const clubInclusivity = roundHundreth(clubRating.Inclusivity);

    const clubRoundedRtg = `${roundHundreth((clubClout + clubVibes + clubIntensity + clubInclusivity) / 4).toFixed(2)}`;

    const red = Math.round(255 * (MAX_RTG - clubRoundedRtg)) / DIFF_RTG;
    const green = Math.round(255 * (clubRoundedRtg - MIN_RTG)) / DIFF_RTG;
    const blue = 0;

    return {clubRoundedRtg: clubRoundedRtg, red: red, green: green, blue: blue};
}

// use useRef

export function OvrRating() {
    // LATER: More refined coloring system
    const clubData = useSelector(state => state.clubData);
    const clubRating = useSelector(state => state.globalRatings);
    const [overallRating, setOverallRating] = useState({clubRoundedRtg: "INITIAL", red: 173, green: 216, blue: 230});
    const dispatch = useDispatch();
    const [testBoolean, setTestBoolean] = useState(0);

    const checkUserRtgUrl = `${process.env.REACT_APP_SERVER_URL}/clubRating/check`;

    useEffect(() => {
        // console.log("I'm in the useEffect for overallRating");
        // api
        //     .get(checkUserRtgUrl, {
        //         params: {clubName: clubData.name}
        //     })
        //     .then((response) => {
        //         const hasUserRating= response.data.hasUserRating;
        console.log("MY NUM OF USER RATINGS: " + JSON.stringify(clubRating.numUserRatings));
        if (clubRating.numUserRatings > 0) {
            console.log("I expect to be here after update!!")
            const newClubRating = getRGBColors(clubRating);
            setOverallRating(newClubRating);
        }
        else {
            setOverallRating({clubRoundedRtg: "NEW", red: 173, green: 216, blue: 230});
        }
            // })
            // .catch((error) => {
            //     console.log("Error occurred: ", error);
            // });
    }, [clubData.name, clubRating]);

    // do we capitalize?
    return (
        <OvrRtgBubble redColor={overallRating.red} greenColor={overallRating.green} blueColor={overallRating.blue}>
            <div>{`${overallRating.clubRoundedRtg}`}</div>
        </OvrRtgBubble>
    );
}

