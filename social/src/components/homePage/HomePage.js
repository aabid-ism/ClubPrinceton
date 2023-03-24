import React from "react";
import Navigation from "../navigation/Navigation";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

function HomePage() {
  const clubData = useSelector(state => state.clubData);

  console.log('Club data:', clubData);
  return (
    <div style={{ height: "100%", backgroundColor: "#FFF8E5" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <SearchBar width="300" height="400" />
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0 }}>
          <Navigation width="300" height="400" />
        </div>
        {clubData.name && (
          <div style={{ position: "fixed", top: 1, right: 1 }}>
            <h2>{clubData.name}</h2>
            <p>{clubData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
