import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PostList from "../post/PostList";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import HomePageMin from "./HomePageMin";

/* Wrapper component for the Home page for the website
  @param - none
  @return - home page wrapper
*/
export default function HomePage() {
  const clubData = useSelector((state) => state.clubData);
  const navigate = useNavigate();
  const user = localStorage.getItem("user")?.replaceAll(/['"]+/g, "");

  // verify user is logged in
  useEffect(() => {
    api
      .get("/auth/verify")

      .then((res) => {})
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [localStorage.getItem("ACCESS_TOKEN")]);

  return (
    <>
      <HomePageMin clubName={clubData.name} user={user}>
        {clubData.name && <PostList></PostList>}
      </HomePageMin>
    </>
  );
}
