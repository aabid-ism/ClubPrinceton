import React from "react";
import "./clubform.css";
import axios from "axios";

function ClubForm(props) {
    // on submission of the club form we need to grab the user id
    // from the store and submit
    // push the netid to the backend

    let handleCloseClick = () => {
        alert("Your changes will not be saved");
        // Have a secondary popup to say are you sure you want to quit
        // assigned a function called toggle in the props
        props.toggle();
    };

    let handleSubmitClick = async () => {
        alert("Are you sure you want to submit this form?");

        const clubName = document.getElementById("clubName").value;
        const clubInfo = document.getElementById("clubInfo").value;
        const clubEmail = document.getElementsById("clubEmail").value;
        const clubPosition = document.getElementsById("clubPosition").value;
        const clubCert = document.getElementsById("clubCert").value;
        const clubAddInfo = document.getElementsById("clubAddInfo").value;
        console.log(clubName);
        console.log(clubInfo);
        console.log(clubEmail);
        console.log(clubPosition);
        console.log(clubCert);
        console.log(clubAddInfo);
        // async await?
        // need to have popup message here!
        
        // process.env.REACT_APP_SERVER_URL
        const clubFormUrl = `http://localhost:5050/clubrequest/submit`;
        // const clubFormUrl = `${process.env.REACT_APP_SERVER_URL}/clubform`;
        // need to do async and await
        
        await axios.get(clubFormUrl);

        await axios
            .post(clubFormUrl, {
                clubName: clubName,
                clubInfo: clubInfo,
                clubEmail: clubEmail,
                clubPosition: clubPosition,
                clubCert: clubCert,
                clubAddInfo: clubAddInfo
            })
            .then((response) => {
            console.log(response);
            })
            .catch((error) => {
            console.log(error);
            });

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
    // bolster submit button and text boxes
    // need to really style up form later
    return (
        <div className="club-form">
                <span className="form-close" onClick={handleCloseClick}>&times;</span>
                <div>
                <form>
                    <center>
                    <h3>Submit An Application to Run Your Own Club Page on ClubPrinceton!</h3>
                    <p>Note: To have your club application be approved, you must be an office of your club.</p>
                    </center>
                    <br></br>
                    <br></br>
                    <center>
                        <h5>Name of Your Club:</h5>
                        <input id="clubName" type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Club Description:</h5>
                        <input id="clubInfo" type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Your Club's Princeton Email Address:</h5>
                        <input id="clubEmail" type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Position Within the Club:</h5>
                        <input id="clubPosition" type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h5>Link to ODUS (Office of the Dean of Undergraduate Students) Recognition of Your Club:</h5>
                        <div>Note: This is optional; however, it will speed up your application approval.<br></br>
                            The link can be a website that has your club listed as being ODUS-recognized.
                        </div>
                        <input id="clubCert" type="text" size="30"></input>
                        <br></br>
                        <br></br>
                        <h5>Additional Info:</h5>
                        <div>Note: This is optional</div>
                        <input id="clubAddInfo" type="text" size="30"></input>
                        <div className="club-form-submit">
                            <br></br>
                            <button onClick={handleSubmitClick} type="submit">Click Here to Submit!</button>
                        </div>
                    </center>
                </form>
                </div>
        </div>
    );


}

export default ClubForm;