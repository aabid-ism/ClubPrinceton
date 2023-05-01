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


  // const fetchVerification = async () => {

  //   let jwt = localStorage.getItem("ACCESS_TOKEN")?.replaceAll(/['"]+/g, "");
  //   // console.log(jwt);
  //   let api2 = await axios.create({
  //     baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   });
  //   api2.interceptors.response.use(
  //     response => response,
  //     error => {
  //       // If the error is a 401 Unauthorized error, redirect the user to the login page
  //       if (error.response?.status === 401 || error.response?.status === 403) {
  //         console.log("Interceptor caught a 401 or 403 forbidden request!");
  //         window.location.href = '/signup';
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   console.log(`The token at Homepage is: ${localStorage.getItem("ACCESS_TOKEN")}`);
  //   await api2.get("/auth/verify").then(console.log("Token was verified and came back to homepage successfully!"));
  // }



  useEffect(() => {
    console.log("I am at homepage, about to send verification request");

    api.get("/auth/verify");

    // .then((res) => {

    // })
    // .catch((err) => {
    //   if (err.response.status === 403 || 401) {
    //     console.log(err);
    //     navigate("/signup");
    //   }
    // });
  }, [localStorage.getItem("ACCESS_TOKEN")]);

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
        <>
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
              // zIndex: 1,
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
        </>

        <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}
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
            {localStorage.getItem("user") && <p>Good day, {user}! </p>}
            {clubData.name && (
              <MainPage
                width={"500px"}
                height={"300px"}
              />
            )}

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
          // style={{
          //   flex: 1,
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   margin: "0 auto",
          //   textAlign: "center",
          // }}
          >
            {clubData.name && (
              <PostList
              // width={"600px"}
              // height={ "1000px"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
