
import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import Landing from "../landing/Landing";
import SearchBar from "../searchBar/SearchBar";

function HomePage() {
  // const defaultEventsProps = {
  //   width: "40",
  //   height: "350",
  //   color: "orange-100",
  //   eventsProps: {
  //     mainEventText: "Big Show!",
  //     recruitingText: "Join us! Lorum Ipsumthing or other",
  //     socialText: "Party on some date or another!",
  //     memberText: "Welcome to the club!",
  //   },
  // };
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
    <div style={{ height: "100vh", backgroundColor: "#FFF8E5" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Landing />
        </div>
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <SearchBar width="300" height="400" />
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0 }}>
          <Navigation width="300" height="400" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
