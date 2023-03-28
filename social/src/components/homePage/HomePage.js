import React from "react";
import Navigation from "../navigation/Navigation";
import SearchBar from "../searchBar/SearchBar";
import MainPage from "../mainpage/MainPage";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import Posts from "../post/Posts";
import UserRating from "../ratings/UserRating";
function HomePage() {
  const clubData = useSelector(state => state.clubData);
  return (
    <div style={{ height: "100%", backgroundColor: "#FFF8E5" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#FFF8E5"
        }}
      >
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <SearchBar width="300" height="400" />
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0 }}>
          <Navigation width="300" height="400" />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {clubData.name && (
            <MainPage width="500" height="400" />
          )}
        </div>

        <Posts></Posts>
      </div>

      {/* 
        <div style={{ flex: 1, display: "flex", justifyContent: "center" , margin: "10px"}}>
          <Post/>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" , margin: "10px"}}>
          <Post/>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" , margin: "10px"}}>
          <Post/>
        </div> */}
      <div>
        <UserRating></UserRating>
      </div>
    </div>
  );
}

export default HomePage;
