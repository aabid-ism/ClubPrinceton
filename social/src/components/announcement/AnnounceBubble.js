import React from "react";
// need to make constant?
import './announce.css';
function AnnounceBubble(props){
    return (
        <div className="announce-bubble">
            {props.children}
        </div>

    );
}

export default AnnounceBubble;