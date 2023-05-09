import { useEffect, useState } from "react";
import axios from "axios";
import api from "../auth/api";
import { useSelector } from "react-redux";
import "./announce.css";

/* 
    Wrapper for the announcement bubble
    @param props.children: the content of the bubble
    @return: the announcement bubble wrapper with the announcement bubble
*/
function AnnounceBubble(props) {
  return <div className="announce-bubble">{props.children}</div>;
}
/* 
    The announcement bubble
    @param: none
    @return: the announcement bubble
*/
export default function Announce() {
  const clubData = useSelector((state) => state.clubData);
  const [announcement, setAnnouncement] = useState("N/A");

  // const announceURL = "http://localhost:5050/announcement/get";
  const announceURL = `${process.env.REACT_APP_SERVER_URL}/announcement/get`;

  // get announcement from backend on load
  useEffect(() => {
    if (clubData.name !== undefined) {
      api
        .get(announceURL, {
          params: {
            clubName: clubData.name,
          },
        })
        .then((response) => {
          const announceData = response.data;
          setAnnouncement(announceData);
        })
        .catch((error) => {
          console.error("Error occurred: ", error);
        });
    }
  }, [clubData]);

  return (
    <AnnounceBubble>
      <div className="announceTitle">
        <h1>Announcement</h1>
      </div>
      <div className="announcementText">{announcement}</div>
    </AnnounceBubble>
  );
}
