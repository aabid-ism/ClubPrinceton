import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import Landing from "../landing/Landing";
import SearchBar from "../searchBar/SearchBar";

function HomePage() {
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
