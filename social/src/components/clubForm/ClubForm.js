import React from "react";
import "./clubform.css";
import axios from "axios";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";

function ClubForm(props) {
    const navigate = useNavigate();
    // on submission of the club form we need to grab the user id
    // from the store and submit
    // push the netid to the backend

    let handleCloseClick = () => {
        alert("Your changes will not be saved");
        // props.toggle()
        // Have a secondary popup to say are you sure you want to quit
        // assigned a function called toggle in the props
        navigate("/");
    };

    let handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("I'm in handleFormSubmit");

        const yesSubmit = window.confirm("Are you sure you want to submit your club application?");
        // async await?
        // need to have popup message here!

        if (yesSubmit) {
            // process.env.REACT_APP_SERVER_URL
            // const clubFormUrl = "http://localhost:5050/clubrequest/submit";
            // api.post doesn't work
            const clubFormUrl = `${process.env.REACT_APP_SERVER_URL}/clubrequest/submit`;

            console.log("Club form url: " + clubFormUrl);
            // need to do async and await

            // capture session netid here!

            // need to add security measures +

            // cookies

            // need to fix form data object send in post request later
            const clubRequestData = new FormData(event.currentTarget);
            const clubName = clubRequestData.get('clubName');
            const clubInfo = clubRequestData.get('clubInfo');
            const clubEmail = clubRequestData.get('clubEmail');
            const clubPosition = clubRequestData.get('clubPosition');
            const clubCert = clubRequestData.get('clubCert');
            const clubAddInfo = clubRequestData.get('clubAddInfo');
            console.log("Additional club info: " + clubAddInfo);

            // need error handling here -> in case netid is not found in local storage
            const applicantNetid = localStorage.getItem('netid');
            console.log("Type of data for netid: " + typeof(applicantNetid));
            const applicantName = localStorage.getItem('user');
            console.log("Type of data for user: " + typeof(applicantName));

            await axios.post(clubFormUrl, {
                clubName: clubName,
                clubInfo: clubInfo,
                clubEmail: clubEmail,
                clubPosition: clubPosition,
                clubCert: clubCert,
                clubAddInfo: clubAddInfo,
                applicantNetid: applicantNetid,
                applicantName: applicantName
            })
            .then((response) => {
                console.log(response);
                alert("Form submitted successfully");
                navigate("/");
                // props.toggle();
            })
            .catch((error) => {
                console.log(error);
            })

        }

        // user is not ready to submit -> goes back to their original form
        // submit button didn't realy work here
    };
    // leave as input fields for now -> revamp post beta
    return (
        <div className="club-form">
                <span className="form-close" onClick={handleCloseClick}>&times;</span>
                <div>
                <form onSubmit={handleFormSubmit}>
                    <center>
                    <h3>Submit An Application to Run Your Own Club Page on ClubPrinceton!</h3>
                    <p>Note: To have your club application be approved, you must be an office of your club.</p>
                    </center>
                    <br></br>
                    <br></br>
                    <center>
                        <h5>Name of Your Club:</h5>
                        <input maxLength={50} name="clubName" type="text" size="30" required></input>
                        <br></br>
                        <br></br>
                        <h5>Club Description:</h5>
                        <input maxLength={150} name="clubInfo" type="text" size="100" required></input>
                        <br></br>
                        <br></br>
                        <h5>Your Club's Princeton Email Address:</h5>
                        <input maxLength={40} name="clubEmail" type="text" size="30" required></input>
                        <br></br>
                        <br></br>
                        <h5>Position Within the Club:</h5>
                        <input maxLength={40} name="clubPosition" type="text" size="30" required></input>
                        <br></br>
                        <br></br>
                        <h5>Link to ODUS (Office of the Dean of Undergraduate Students) Recognition of Your Club:</h5>
                        <div>Note: This is optional; however, it will speed up your application approval.<br></br>
                            The link can be a website that has your club listed as being ODUS-recognized.
                        </div>
                        <br></br>
                        <input maxLength={100} name="clubCert" type="text" size="100"></input>
                        <br></br>
                        <br></br>
                        <h5>Additional Info:</h5>
                        <div>Note: This is optional</div>
                        <input maxLength={300} name="clubAddInfo" type="text" size="100"></input>
                        <div>
                            <br></br>
                            <button className="popup-btn" type="submit"><strong>Click Here to Submit!</strong></button>
                        </div>
                    </center>
                </form>
                </div>
        </div>
    );


}

export default ClubForm;