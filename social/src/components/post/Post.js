import React from "react";

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
    return (
        <Post props={props.postProps}/>
    );
}

export default PostBubble;