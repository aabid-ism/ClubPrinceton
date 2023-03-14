import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Navigation from "../navigation/Navigation";
import Landing from "../landing/Landing";
import MainPage from "../mainpage/MainPage";
import Event from "../events/Events";
import Post from "../post/Post";

function HomePage() {
  const defaultEventsProps = {
    width: "40",
    height: "350",
    color: "orange-100",
    eventsProps: {
      mainEventText: "Big Show!",
      recruitingText: "Join us! Lorum Ipsumthing or other",
      socialText: "Party on some date or another!",
      memberText: "Welcome to the club!",
    },
  };
  // const defaultPostProps = {
  //   width: "40",
  //   height: "350",
  //   color: "slate-100",
  //   postProps: {
  //     iconImage: "placeholder",
  //     content: "bruh moment",
  //   },
  // };
  return (
    <div className="relative h-screen bg-#fed7aa">
      <div className="flex flex-col h-full justify-center">
        <div className="flex items-center justify-center flex-grow">
          <Landing />
        </div>
        <div>
          <Post/>
          <Post/>
        </div>
        <div className="fixed top-0 left-0">
          <SearchBar width="80" height="400" color="orange" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
