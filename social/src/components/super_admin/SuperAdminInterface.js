import { useState, useEffect } from "react";
import axios from "axios";
import "./superadmin.css";

export default function SuperAdminInterface() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/clubCreation`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleAccept = (club) => {
    // set club status to accepted
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/clubCreation/a/${club.name}`
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

  // display each of the club's data with a button to set that club to active club
  // and set clubDetails with that club's data
  return (
    <div className="superadmin">
      <div className="superadmin__clubs">
        {clubs.map((club) => {
          return (
            <div className="superadmin__club">
              <div className="superadmin__club__title">Club Name:</div>
              <div className="superadmin__club__name">{club.name}</div>

              <div className="superadmin__club__title">
                Description:
              </div>
              <div className="superadmin__club__description">
                {club.description}
              </div>

              <div className="superadmin__club__title">Leadership:</div>
              <div className="superadmin__club__leadership">
                {club.leadership}
              </div>

              <div className="superadmin__club__title">ODUS Link:</div>
              <div className="superadmin__club__odusLink">
                {club.odusLink}
              </div>

              <div className="superadmin__club__title">Email:</div>
              <div className="superadmin__club__email">
                {club.email}
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
          );
        })}
      </div>
    </div>
  );
}
