import { useEffect, useState } from "react";
import axios from 'axios';
import api from "../auth/api";
import { useSelector } from "react-redux";
import "./announce.css";


function AnnounceBubble(props){
    return (
        <div className="announce-bubble">
            {props.children}
        </div>

    );
}

export default function Announce() {
    const clubData = useSelector(state => state.clubData);
    const [announcement, setAnnouncement] = useState("N/A");

    // const announceURL = "http://localhost:5050/announcement/get";
    const announceURL = `${process.env.REACT_APP_SERVER_URL}/announcement/get`;

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
        api
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

    const string200Chars = "The quick brown fox jumps over the lazy dog. Pack my box with five" +
    "dozen liquor jugs. How vexingly quick daft zebras jump! Jackdaws love my big sphinx of quartz. The five boxing wizards jump quickly. Amazingly few discotheques provide jukeboxes.";
    console.log(announcement);
    return (
        <AnnounceBubble>
            <div className="announceTitle">
                    <h1>Announcement</h1>
            </div>
            <div className="announcementText">{announcement}</div>
        </AnnounceBubble>
    );


}
