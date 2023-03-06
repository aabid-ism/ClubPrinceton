import React from "react";

function Events({props}){
    return (
        <div>
            <p>Hello</p>
        </div>
    );
}

function Bubble({props}){
    console.log(props.height)
    return (
        <div className={
            `flex w-${props.width} h-${props.height} bg-${props.color} mx-auto rounded-lg:`
        }>
            <div>
                <Events></Events>
            </div>
        </div>
    );
}

export default Bubble;