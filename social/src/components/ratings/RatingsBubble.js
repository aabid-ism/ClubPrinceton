import React from "react";
import './rtgbubble.css';

/*
    The ratings bubble wrapper component.
    @param props: the props passed to the component with the child components inside
    @return the RatingsBubble component with the child components inside
*/

function RatingsBubble({children}){
    return (
        <>
            {children}
        </>

    );
}

export default RatingsBubble;