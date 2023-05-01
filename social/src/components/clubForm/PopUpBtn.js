import React, {useState} from "react";
import ClubForm from "./ClubForm";
// import "./clubform.css";
import Navigation from "../navigation/Navigation";
import { useNavigate } from "react-router-dom";

function PopUpBtn() {
    const navigate = useNavigate();
    // will be given a state from popup button via props
    // need to build a secondary popup message
    // const [popped, setPopped] = useState(false);

    const handleClick = () => {
        navigate("/clubform");
    };

    return (
        <div>
            <div onClick={handleClick}>
                <button>Submit Your Club</button>
            </div>
            {/* {popped ? <ClubForm toggle={togglePop}/> : null} */}
        </div>
    );






}

export default PopUpBtn;