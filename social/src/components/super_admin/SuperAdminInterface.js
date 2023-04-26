import { useState, useEffect } from "react";
import axios from "axios";
import "./superadmin.css";

export default function SuperAdminInterface() {
  const [clubs, setClubs] = useState([]);
  const [whitelisted, setWhitelisted] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/clubCreation`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // check if user is whitelisted
    axios
      .get(
        `${
          process.env.REACT_APP_SERVER_URL
        }/auth/whitelist/${localStorage.getItem("netid")}`
      )
      .then((res) => {
        setWhitelisted(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAccept = (club) => {
    // set club status to accepted
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/clubCreation/a/${
          club.name
        }/${localStorage.getItem("netid")}`,
        club
      )
      .then((res) => {
        console.log("club accepted");
      })
      .catch((err) => {
        console.log("club not accepted");
      });
  };

  const handleDecline = (club) => {
    // set club status to declined
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/clubCreation/d/${club.name}`
      )
      .then((res) => {
        console.log("club declined");
      })
      .catch((err) => {
        console.log("club not declined");
      });
  };

  // see if user is whitelisted by checking if netid is in whitelist

  if (whitelisted) {
    return (
      <div className="superadmin">
        <h1 className="superadmin__title">Super Admin Interface</h1>
        <div className="superadmin__clubs">
          {clubs.map((club, index) => {
            return (
              <div className="superadmin__club" key={index}>
                <div className="superadmin__club">
                  <div className="superadmin__club__title">
                    Club Name:
                  </div>
                  <div className="superadmin__club__name">
                    {club.name}
                  </div>

                  <div className="superadmin__club__title">
                    Description:
                  </div>
                  <div className="superadmin__club__description">
                    {club.description}
                  </div>

                  <div className="superadmin__club__title">
                    Leadership:
                  </div>
                  <div className="superadmin__club__leadership">
                    {club.positionInClub}: {club.applicantName}
                  </div>

                  <div className="superadmin__club__title">Email:</div>
                  <div className="superadmin__club__email">
                    {club.email}
                  </div>

                  <div className="superadmin__club__title">
                    Certificate Link:
                  </div>
                  <div className="superadmin__club__certificateLink">
                    {club.certificateLink}
                  </div>

                  <div className="superadmin__club__title">
                    Additional Info:
                  </div>
                  <div className="superadmin__club__addInfo">
                    {club.addInfo}
                  </div>

                  <div className="superadmin__club__title">Status:</div>
                  <div className="superadmin__club__status">
                    {club.status}
                  </div>

                  <button
                    className="superadmin__club__button"
                    onClick={() => handleAccept(club)}
                  >
                    Accept
                  </button>
                  <button
                    className="superadmin__club__button"
                    onClick={() => handleDecline(club)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // return html that says user is not allowed to access this page
    return (
      <div className="superadmin">
        <div className="superadmin__clubs">
          <div className="superadmin__club">
            <div className="superadmin__club__title">
              You are not allowed to access this page
            </div>
          </div>
        </div>
      </div>
    );
  }
}
