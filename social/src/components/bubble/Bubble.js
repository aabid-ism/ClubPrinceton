import React from "react";

function Bubble({props}){
    return (
        <div className={
            `flex w-${props.width} h-${props.height} bg-${props.color} mx-auto rounded-lg shadow-md`
        }>
            <div>
                {props.component}
            </div>
        </div>
    );
}

export default Bubble;

