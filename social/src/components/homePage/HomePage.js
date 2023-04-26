import React, { useState, useEffect } from "react";

import Navigation from "../navigation/Navigation";
import SearchBar from "../searchBar/SearchBar";
import MainPage from "../mainpage/MainPage";
import { useSelector } from "react-redux";
import PostList from "../post/PostList";
import UserRating from "../ratings/UserRating";
import { useMediaQuery } from "react-responsive";
import { FaSearch, FaBars, FaStar } from "react-icons/fa";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Announce from "../announcement/Announce";
import { OvrRating } from "../clubRating/OvrRating";
import { ClubRtgBreakdown } from "../clubRating/ClubRtgBreakdown";

export default function HomePage() {
  const clubData = useSelector((state) => state.clubData);
  const navigate = useNavigate();
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");

  useEffect(() => {
    console.log("I am at homepage, about to send verification request");

    let jwt = localStorage.getItem("jwt")?.replaceAll(/['"]+/g, "");
    console.log(jwt);
    let api2 = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    api2
      .get("/auth/verify")
      // .then((res) => {

      // })
      .catch((err) => {
        if (err.response.status === 403) {
          console.log(err);
          navigate("/signup");
        }
      });
  }, []);

  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFF8E5",
          display: "flex",
          flexDirection: "column",
          zIndex: -1,
        }}
      >
        <React.Fragment>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100",
              zIndex: 1,
            }}
          >
            <SearchBar width="300" height="400" />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
            }}
          >
            <Navigation width="300" height="400" />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
            }}
          >
            {clubData.name && (
              <UserRating width="300px" height="400px" />
            )}
          </div>
        </React.Fragment>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {clubData.name && (
              <MainPage
                width={"500px"}
                height={"300px"}
              />
            )}

            {localStorage.getItem("user") && <p>Good day, {user}! </p>}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {clubData.name && <Announce />}
          </div>
          <div
          style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          textAlign: "center",
          }}
          >
            {clubData.name && <OvrRating />}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {clubData.name && (
              <PostList
                width={"600px"}
                height={ "1000px"}
              />
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {clubData.name && <ClubRtgBreakdown />}
      </div>

      {/* <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <PostList
        />
      </div> */}
    </div>
  );
}
