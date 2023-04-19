import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import AnnounceBubble from "./AnnounceBubble";

export function Announce() {
    const clubData = useSelector(state => state.clubData);
    const [announcement, setAnnouncement] = useState("");

    const announceURL = "http://localhost:5050/announcement/get";

    // to the backend -> we are sending back the club
    // link we are currently on

    // if malformed -> announcement needs to be edited to N/A

    // Do we need to have a timestamp for Annoucement
    // in case the upcoming annoucement expires


    // make an axios request using clubData.name to get the overall rating

    // let clubAnnoucement = "This is my fake announcement with making a get request";
    // let clubAnnouncement = "this is my announcement";

    // need to change to api.get for authentication
    if (clubData.name !== undefined) {
        axios
        .get(announceURL, {
            params: {
                clubName: clubData.name
            }
        })
        .then((response) => {
            const announceData = response.data;
            console.log("announcement data from the backend: " + announceData);
            // clubAnnouncement = announceData;
            setAnnouncement(announceData);
            console.log("type of announcement: " + typeof(announcement));
            // annoucement = data;
        })
        .catch((error) => {
            // want to have error message popup here!
            console.log("Error occurred: ", error);
        });
    }
    // need to set character limits -> and all box sizes should only go up to that character limit
    // some error has occurred with clubData.name being undefined
    // annoucement = "N/A";

    // do we capitalize?
    console.log(announcement);
    return (
        <AnnounceBubble>
            <center>
                <h3>Club Annoucement</h3>
                <div>{announcement}</div>
            </center>
        </AnnounceBubble>
    );


}

export default Announce;