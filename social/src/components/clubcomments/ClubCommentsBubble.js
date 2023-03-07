import React from "react";
import Bubble from "../bubble/Bubble";

function ClubComments({ props }){
    const clubCommentProps = props.clubCommentProps;
    return (
        <div>
            
        </div>
    );
}

function ClubCommentsBubble({ props }){
    props.component = <ClubComments/>
    return (
        <div>
            <Bubble props={props}/>
        </div>
    );
}

export default ClubCommentsBubble;