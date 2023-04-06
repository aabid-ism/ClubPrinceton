import React from "react";

function Bubble(props) {
  return (
    <div
      className={`flex w-${props.width}p h-${props.height}p bg-${props.color} rounded-lg shadow-md`}
    >
      <div>{props.children}</div>
    </div>
  );
}

export default Bubble;
