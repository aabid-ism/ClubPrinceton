import React, {useState} from "react";
import ClubForm from "./ClubForm";
import "./clubform.css";

function PopUpBtn() {
    // will be given a state from popup button via props
    // need to build a secondary popup message
    const [popped, setPopped] = useState(false);

    let togglePop = () => {
        setPopped(!popped);
    };

    return (
        <div>
            <div className="popup-btn" onClick={togglePop}>
                <button><strong>Submit Your Club!</strong></button>
            </div>
            {popped ? <ClubForm toggle={togglePop}/> : null}
        </div>
    );






}

export default PopUpBtn;