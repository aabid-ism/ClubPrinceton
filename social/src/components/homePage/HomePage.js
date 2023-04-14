import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import SearchBar from "../searchBar/SearchBar";
import MainPage from "../mainpage/MainPage";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import PostList from "../post/PostList";
import UserRating from "../ratings/UserRating";
import Events from "../events/Events";
import { useMediaQuery } from "react-responsive";
import { FaSearch, FaBars, FaStar } from "react-icons/fa";
function HomePage() {
  const clubData = useSelector((state) => state.clubData);
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

  return (
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
          {showNavigation && <Navigation width="100%" height="100%" />}
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
        {clubData.name && isTabletOrMobile && (
          <MainPage width="100%" height="30%" />
        )}
        {clubData.name && isDesktopOrLaptop && (
          <MainPage width="500px" height="300px" />
        )}
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
        {clubData.name && isTabletOrMobile && (
          <PostList width="100%" height="60%" />
        )}
        {clubData.name && isDesktopOrLaptop && (
          <PostList width="600px" height="1000px" />
        )}
      </div>
    </div>
  );
}

export default HomePage;
