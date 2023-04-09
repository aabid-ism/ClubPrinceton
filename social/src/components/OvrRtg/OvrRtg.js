// need to first situate the OvrRating bubble
// and Annoucement bubble in the frontend

import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const URL = "http://localhost:5050/ovrrtg";

export function OvrRtg() {
    const clubData = useSelector(state => state.clubData);

    // to the backend -> we are sending back the club
    // link we are currently on

    // make an axios request using clubData.name to get the overall rating

    const ovrRating = 4.7;

    const MAX_RTG = 5;
    // MIN rating 1 or 0? -> EDGE CASE
    const MIN_RTG = 1;
    const DIFF_RTG = 4;

    // magic number
    const RED = Math.round(255 * (ovrRating - MIN_RTG)) / DIFF_RTG;
    const GREEN = Math.round(255 * (MAX_RTG - ovrRating)) / DIFF_RTG;
    const BLUE = 0;

    // do we capitalize?
    const COLOR = 'rgb(${RED}, ${GREEN})';


}

export default OvrRtg;