import React from "react";
// need to make constant?
import './rtgbubble.css';
function RatingsBubble({ children }){
    return (
        <div className="rtg-bubble">
            {children}
        </div>

    );
}

export default RatingsBubble;