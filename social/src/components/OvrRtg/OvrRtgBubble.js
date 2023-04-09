import React from "react";
// need to make constant?
import './ovrrtgbubble.css';
function OvrRtgBubble({ children }){
    return (
        <div className="ovr-rtg-bubble">
            {children}
        </div>

    );
}

export default OvrRtgBubble;