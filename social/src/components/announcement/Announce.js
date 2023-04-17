import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import AnnounceBubble from "./AnnounceBubble";

const URL = "http://localhost:5050/annoucement";

export function Announce() {
    const clubData = useSelector(state => state.clubData);

    // to the backend -> we are sending back the club
    // link we are currently on

    // get the announcement
    // this announcement would either be a viable string
    // or something malformed
    // if malformed -> announcement needs to be edited to N/A

    // Do we need to have a timestamp for Annoucement
    // in case the upcoming annoucement expires


    // make an axios request using clubData.name to get the overall rating

    let annoucement = "This is my fake announcement with making a get request";

    // if (clubData.name !== undefined) {
    //     axios
    //     .get(URL + "/" + clubData.name)
    //     .then((response) => {
    //         const data = response.data;
    //         // ?
    //         annoucement = data;
    //     })
    //     .catch((error) => {
    //         console.log("Error occurred: ", error);
    //     });
    // }
    // some error has occurred with clubData.name being undefined
    // annoucement = "N/A";

    // do we capitalize?
    return (
        <AnnounceBubble>
            <div>{annoucement}</div>
        </AnnounceBubble>
    );


}

export default Announce;