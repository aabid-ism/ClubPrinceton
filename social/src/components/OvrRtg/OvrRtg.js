// need to first situate the OvrRating bubble
// and Annoucement bubble in the frontend

import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import OvrRtgBubble from "./OvrRtgBubble";


export function OvrRtg() {
    const clubData = useSelector(state => state.clubData);
    // made it N/A so we can differentiate what is being seen!
    // in case there is a massive error
    let [ovrRating, setOvrRating] = useState("N/A");


    const ovrRatingURL = "http://localhost:5050/ovr_rating/breakdown";
    // NONE RATING -> GRAY BACKGROUND
    // BREAKDOWN NONE -> INDIVIDUAL NONE -> GRAY TEXT BACKGROUND

    // to the backend -> we are sending back the club
    // link we are currently on

    // make an axios request using clubData.name to get the overall rating

    if (clubData.name !== undefined) {
        axios
            .get(ovrRatingURL, {
                params: {clubName: clubData.name}
            })
            .then((response) => {
                const ovrRatingData = response.data.ovrRating;
                console.log("Overall Rating for the Club: " + ovrRatingData);
                setOvrRating(ovrRatingData);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
    }

    // for default need to set word NEW and default coloring of blue

    const MAX_RTG = 5;
    // MIN rating 1 or 0? -> EDGE CASE
    const MIN_RTG = 1;
    const DIFF_RTG = 4;

    // colors for lightblue using rgb function
    let red = 173;
    let green = 216;
    let blue = 230;

    // need more defined colors
    // magic number

    if (ovrRating !== "NEW") {
        red = Math.round(255 * (MAX_RTG - ovrRating)) / DIFF_RTG;
        green = Math.round(255 * (ovrRating - MIN_RTG)) / DIFF_RTG;
        blue = 0;
    }

    // do we capitalize?
    return (
        <OvrRtgBubble redColor={red} greenColor={green} blueColor={blue}>
            <div>{ovrRating}</div>
        </OvrRtgBubble>
    );


}

export default OvrRtg;