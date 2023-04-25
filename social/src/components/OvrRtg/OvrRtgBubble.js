import React from "react";
// need to make constant?
import './ovrrtg.css';
function OvrRtgBubble(props){
    let cssProperties = {
        // forget about rgb
        // see if you can pass in red
        backgroundColor: "rgb(" + props.redColor + "," + props.greenColor + ",0)"
    };
    return (
        <div className="ovr-rtg-bubble" style={cssProperties}>
            {props.children}
        </div>

    );
}

export default OvrRtgBubble;