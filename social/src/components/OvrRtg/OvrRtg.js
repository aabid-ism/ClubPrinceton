// need to first situate the OvrRating bubble
// and Annoucement bubble in the frontend

import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import OvrRtgBubble from "./OvrRtgBubble";

const URL = "http://localhost:5050/ovrrtg";

export function OvrRtg() {
    const clubData = useSelector(state => state.clubData);

    // to the backend -> we are sending back the club
    // link we are currently on

    // make an axios request using clubData.name to get the overall rating

    const ovrRating = 2.7;

    const MAX_RTG = 5;
    // MIN rating 1 or 0? -> EDGE CASE
    const MIN_RTG = 1;
    const DIFF_RTG = 4;

    // need more defined colors
    // magic number
    let red = Math.round(255 * (MAX_RTG - ovrRating)) / DIFF_RTG;
    let green = Math.round(255 * (ovrRating - MIN_RTG)) / DIFF_RTG;

    // do we capitalize?
    return (
        <OvrRtgBubble redColor={red} greenColor={green}>
            <div>{ovrRating}</div>
        </OvrRtgBubble>
    );


}

export default OvrRtg;