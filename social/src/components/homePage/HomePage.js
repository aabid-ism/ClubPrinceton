import React from "react";
import SearchBar from "../searchBar/SearchBar";

function HomePage() {
  return (
    <div className="flex h-screen">
      <div className="absolute top-0 left-0">
        <SearchBar width="64p" height="120p" />
      </div>
      <div className="absolute top-0 right-0">
        <SearchBar width="64p" height="120p" />
      </div>
      <div className="absolute bottom-0 left-0">
        <SearchBar width="64p" height="120p" />
      </div>
      <div className="absolute bottom-0 right-0">
        <SearchBar width="64p" height="120p" />
      </div>
    </div>
  );
}

export default HomePage;
