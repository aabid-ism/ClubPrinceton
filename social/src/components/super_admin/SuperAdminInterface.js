import { useState, useEffect } from "react";
import axios from "axios";
import api from "../auth/api";
import "./superadmin.css";
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import NavBar from "./NavBar";

export default function SuperAdminInterface() {
  const [clubs, setClubs] = useState([]);
  const [whitelisted, setWhitelisted] = useState(false);

  const [rerenderCount, setRerenderCount] = useState(0);

  useEffect(() => {
    // get all clubs from backend that requested approval
    api
      .get(`${process.env.REACT_APP_SERVER_URL}/clubCreation`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // check if user is whitelisted
    api
      .get(
        `${process.env.REACT_APP_SERVER_URL
        }/auth/whitelist/${localStorage.getItem("netid")}`
      )
      .then((res) => {
        setWhitelisted(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // rerender when club status changes
  useEffect(() => { }, [rerenderCount]);

  /*
    Handles the action of accepting a club

    @param club: the club object
    @param index: the index of the club in the clubs array

    @return: none

  */
  const handleAccept = (club, index) => {
    // set club status to accepted in backend
    api
      .post(
        `${process.env.REACT_APP_SERVER_URL}/clubCreation/a/${club.name
        }/${localStorage.getItem("netid")}`
      )
      .then((res) => {
        // console.log("club accepted");
      })
      .catch((err) => {
        console.error("club not accepted");
      });

    // set status of clubs in state and trigger rerender
    clubs[index]["status"] = "Accepted";
    setRerenderCount(rerenderCount + 1);
  };

  /*
    Handles the action of declining a club

    @param club: the club object
    @param index: the index of the club in the clubs array

    @return: none
  
  */
  const handleDecline = (club, index) => {
    // set club status to declined in backend
    // removing club.name from url
    api
      .post(`${process.env.REACT_APP_SERVER_URL}/clubCreation/d`, {
        clubName: club.name,
      })
      .then((res) => {
        console.log("club declined");
      })
      .catch((err) => {
        console.log("club not declined");
      });

    // set status of clubs in state and trigger rerender
    clubs[index]["status"] = "Declined";
    setRerenderCount(rerenderCount + 1);
  };

  // see if user is whitelisted by checking if netid is in whitelist

  if (whitelisted) {
    return (
      <Container fluid className="superadmin">
        <Row><h1>SuperAdmin Interface</h1> </Row>
        <Row>
          <NavBar />
        </Row>

        <Row>
          <Container className="superadmin__clubs">
            {clubs.map((club, index) => {
              return (
                <Container className="superadmin__club" key={index}>
                  <div className="superadmin__club__title">
                    Club Name:
                  </div>
                  <div className="superadmin__club__info">
                    {club.name}
                  </div>

                  <div className="superadmin__club__title">
                    Description:
                  </div>
                  <div className="superadmin__club__info">
                    {club.description}
                  </div>

                  <div className="superadmin__club__title">
                    Leadership:
                  </div>
                  <div className="superadmin__club__info">
                    {club.positionInClub}: {club.applicantName}
                  </div>

                  <div className="superadmin__club__title">Email:</div>
                  <div className="superadmin__club__info">
                    {club.email}
                  </div>

                  <div className="superadmin__club__title">
                    Certificate Link:
                  </div>
                  <div className="superadmin__club__info">
                    {club.certificateLink}
                  </div>

                  <div className="superadmin__club__title">
                    Additional Info:
                  </div>
                  <div className="superadmin__club__info">
                    {club.addInfo}
                  </div>

                  <div className="superadmin__club__title">Status:</div>
                  <div className="superadmin__club__info">
                    {club.status}
                  </div>

                  {club.status === "pending" && (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        className="superadmin__club__button"
                        onClick={() => handleAccept(club, index)}
                      >
                        Accept
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        className="superadmin__club__button"
                        onClick={() => handleDecline(club, index)}
                      >
                        Decline
                      </Button>
                    </>
                  )}

                  {club.status === "declined" && (
                    <Button
                      className="superadmin__club__button"
                      onClick={() => handleAccept(club)}
                    >
                      Accept
                    </Button>
                  )}
                </Container>
              );
            })}
          </Container>
        </Row>
      </Container>
    );
  } else {
    // return html that says user is not allowed to access this page
    return (
      <div className="superadmin">
        <div className="superadmin__clubs">
          <div className="superadmin__club">
            <div className="superadmin__club__info">
              You are not allowed to access this page
            </div>
          </div>
        </div>
      </div>
    );
  }
}
