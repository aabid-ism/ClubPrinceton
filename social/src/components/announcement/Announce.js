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

    // styling -> edge cases needed:
    // text box needs to be fixed
    // message needs to be centered in that textbox with padding
    // do we capitalize?

    // build a 200 character fixed box size
    const string200Chars = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Jackdaws love my big sphinx of quartz. The five boxing wizards jump quickly. Amazingly few discotheques provide jukeboxes.";
    console.log(announcement);
    return (
        <AnnounceBubble>
            <div className="announceTitle">
                    <h4>Annoucement</h4>
            </div>
            <div className="announcementText">{announcement}</div>
        </AnnounceBubble>
    );


}

export default Announce;