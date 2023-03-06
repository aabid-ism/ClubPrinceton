import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Navigation from "../navigation/Navigation";
import Landing from "../landing/Landing";
import MainPage from "../mainpage/MainPage";

function HomePage() {
  return (
    <div className="relative h-screen bg-#fed7aa">
      <div className="flex flex-col h-full justify-center">
        <div className="flex items-center justify-center flex-grow">
          <Landing />
        </div>
        <div className="flex items-center justify-center flex-grow">
          <MainPage mainDescription={"Hello! This is placeholder \n text"} />
        </div>
      </div>
      <div className="fixed top-0 left-0  z-10">
        <SearchBar width="40" height="350" />
      </div>
      <div className="fixed bottom-0 left-0 z-10">
        <Navigation width="80p" height="360p" />
      </div>
    </div>
  );
}

export default HomePage;
