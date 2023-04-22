import React, { useEffect } from "react";
import Navigation from "../navigation/Navigation";
import SearchBar from "../searchBar/SearchBar";
import MainPage from "../mainpage/MainPage";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import PostList from "../post/PostList";
import UserRating from "../ratings/UserRating";
import Events from "../events/Events";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Announce from "../announcement/Announce";

function HomePage() {
  const clubData = useSelector(state => state.clubData);
  const navigate = useNavigate();
  const user = localStorage.getItem('user')?.replaceAll(/['"]+/g, '');

  useEffect(() => {
    console.log("I am at homepage, about to send verification request");

    let jwt = localStorage.getItem('jwt')?.replaceAll(/['"]+/g, '');
    console.log(jwt)
    let api2 = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}`,
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    api2.get('/auth/verify')
      // .then((res) => {

      // })
      .catch((err) => {
        if (err.response.status === 403) {
          console.log(err);
          navigate("/signup");
        }
      }
      )
  }, []);
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
          {localStorage.getItem('user') && <p>Good day, {user}! </p>}
          {clubData.name && (
            <MainPage width="500" height="400" />
          )}
        </div>
      </div>
      {/* For Beta -> I did a quick fix to push the posts list down. I used top/left/right/bottom in the posts css */}
        <div>
          {clubData.name && <Announce />}
        </div>
        <div >
            {clubData.name && <PostList></PostList>}
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
        {clubData.name && (<UserRating></UserRating>)}
      </div>
      {/* <div style={{ position: "fixed", top: 0, right: 0 }}>
          <Events width="300" height="400" />
        </div> */}
    </div>
  );
}

export default HomePage;
