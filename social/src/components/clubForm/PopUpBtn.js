import React from "react";
import "./clubform.css";
import { useNavigate } from "react-router-dom";

/* Button for the pop up form
    @param - none
    @return - button for the pop up form
*/
function PopUpBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/clubform");
  };

  return (
    <div>
      <div onClick={handleClick}>Submit Your Club</div>
    </div>
  );
}

export default PopUpBtn;
