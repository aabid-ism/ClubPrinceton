import React from "react";
// need to make constant?
import './rtgbubble.css';
function RatingsBubble({ children, width, height }){
    return (
        <div className="rtg-bubble" 
            style={{
                width: width,
                height: height,
            }}
        >
            {children}
        </div>

    );
}

export default RatingsBubble;