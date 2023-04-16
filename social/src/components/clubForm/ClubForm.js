import React from "react";
import "./clubform.css";

function ClubForm(props) {
    // on submission of the club form we need to grab the user id
    // from the store and submit
    // push the netid to the backend

    let handleClick = () => {
        // Have a secondary popup to say are you sure you want to quit
        // assigned a function called toggle in the props
        props.toggle();
    };

    // need to make an Axios Request here on submit form

    // need to set character limits
    // test form, then fill out form later
    // TEST CASES: form right now is taking up entire space
    // if I go back on the browser -> I don't get a warning
    // we are not saving form data for users
    // character limits on form submission

    // need to send out an email highlighting the details -> person
    // requesting will automatically be given admin access

    // Netid of requestor will be sent to backend from session (can we access from backend?)
    // Accept or Decline: Pending status will be sent to backend (will initialize in backend)
    // change text box size later
    // in backend need to submit empty admin array
    // hardcoded br for now -> need to update later
    // br spaces needs to be refactored in css
    // need to scan for bad words
    return (
        <div className="club-form">
                <span className="form-close" onClick={handleClick}>&times;</span>
                <div>
                <form method="post">
                    <center>
                    <h3>Submit An Application to Run Your Own Club Page on ClubPrinceton!</h3>
                    <p>Note: To have your club application be approved, you must be an office of your club.</p>
                    </center>
                    <br></br>
                    <br></br>
                    <center>
                        <h5>Name of Your Club:</h5>
                        <input type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Club Description:</h5>
                        <input type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Your Club's Princeton Email Address:</h5>
                        <input type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Link to Certification of ODUS Recognition:</h5>
                        <input type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Position Within the Club:</h5>
                        <input type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Additional Info:</h5>
                        <input type="text" size="30"></input>
                        <div className="club-form-submit">
                            <button type="submit">Click Here to Submit!</button>
                        </div>
                    </center>
                </form>
                </div>
        </div>
    );


}

export default ClubForm;