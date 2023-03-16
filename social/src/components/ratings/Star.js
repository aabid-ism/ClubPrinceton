import React, { useState } from 'react';
// need citation for the polygon dimension
// remove divs later?
// should changing background color be dealt with at star or RatingStar level
// add citations
function Star(props) {
    
    return (
        <div className='star'>
                <svg
                    // changed to 38 from 58
                    width="28" 
                    height="58" 
                    viewBox="0 0 24 24"
                    stroke="#393939" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={props.style}
                    // check to see if you can add this to css
                    fill="orange"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
        </div>
    );
}

export default Star;