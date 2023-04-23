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
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showUserRating, setShowUserRating] = useState(false);

  const handleSearchBarClick = () => {
    setShowSearchBar(!showSearchBar);
    setShowNavigation(false);
    setShowUserRating(false);
  };

  const handleNavigationClick = () => {
    setShowNavigation(!showNavigation);
    setShowSearchBar(false);
    setShowUserRating(false);
  };
  const handleUserRatingClick = () => {
    setShowUserRating(!showUserRating);
    setShowSearchBar(false);
    setShowNavigation(false);
  };
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
        }}
      >
        {isTabletOrMobile && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div onClick={handleSearchBarClick}>
                <FaSearch size={20} style={{ marginRight: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Search</span>
              </div>
              <div onClick={handleNavigationClick}>
                <FaBars size={20} style={{ marginRight: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Menu</span>
              </div>
            </div>
            {showSearchBar && <SearchBar width="100%" height="100%" />}
            {showNavigation && (
              <Navigation width="100%" height="100%" />
            )}
            <button onClick={handleUserRatingClick}>
              <FaStar size={20} style={{ marginRight: "10px" }} />
              {showUserRating ? "Hide Rating" : "Show Rating"}
            </button>
            {showUserRating && <UserRating width="100%" height="35%" />}
          </div>
        )}

        {isDesktopOrLaptop && (
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
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            maxWidth: isDesktopOrLaptop ? "70%" : "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {clubData.name && (
            <MainPage
              width={isTabletOrMobile ? "100%" : "500px"}
              height={isTabletOrMobile ? "30%" : "300px"}
            />
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {localStorage.getItem("user") && <p>Good day, {user}! </p>}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: isDesktopOrLaptop ? "70%" : "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {clubData.name && (
            <PostList
              width={isTabletOrMobile ? "100%" : "600px"}
              height={isTabletOrMobile ? "60%" : "1000px"}
            />
          )}
        </div>
      </div>
      <div>
        {clubData.name && <ClubRtgBreakdown />}
      </div>
      <div>
        {clubData.name && <OvrRating />}
      </div>
      <div>{clubData.name && <Announce />}</div>
      {clubData.name && (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: isDesktopOrLaptop ? "70%" : "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <PostList
            width={isTabletOrMobile ? "100%" : "500px"}
            height={isTabletOrMobile ? "40%" : "400px"}
          />
        </div>
      )}
    </div>
  );
}
