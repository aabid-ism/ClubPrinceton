import React from "react";
import Bubble from "../bubble/Bubble";

function Post({ props }){
    console.log(props.iconImage)
    return (
        <div>
            <ul>
                <li>Place</li>
                <li>Holder</li>
            </ul>
        </div>
    );
}

function PostBubble({props}){
    props.component = <Post props={props.postProps}/>;
    return (
        <Bubble props={props}/>
    );
}

export default PostBubble;