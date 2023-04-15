import React, {useState} from "react";
import "./clubform.css";

function ClubForm(props) {
    // on submission of the club form we need to grab the user id
    // from the store and submit
    // push the netid to the backend

    let handleClick = () => {
        // Have a secondary popup to say are you sure you want to quit
        props.toggle();
    };

    // need to make an Axios Request here on submit form

    // need to set character limits
    // test form, then fill out form later
    return (
        <div className="club-form">
            <div className="form-content">
                <span className="close" onClick={handleClick}>&times;</span>
                <form>
                    <h3>Submit An App</h3>
                </form>
            </div>
        </div>
    );


}

export default ClubForm;