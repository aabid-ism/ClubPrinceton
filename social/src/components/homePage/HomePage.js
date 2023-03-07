import React from "react";
import SearchBar from "../searchBar/SearchBar";
import Navigation from "../navigation/Navigation";
import Landing from "../landing/Landing";
import MainPage from "../mainpage/MainPage";
import Event from "../events/Events";
import PostBubble from "../post/Post";

function HomePage() {
  const defaultEventsProps = {width: "40", height: "350", color:"orange-100",
   eventsProps: {
    mainEventText: "Big Show!",
    recruitingText: "Join us! Lorum Ipsumthing or other",
    socialText: "Party on some date or another!",
    memberText: "Welcome to the club!"
   }
  };
  const defaultPostProps = {width: "40", height: "350", color:"slate-100",
   postProps: {
    iconImage: "placeholder",
    content: "bruh moment"
   }
  };  
  return (
    <div className="relative h-screen bg-#fed7aa">
      <div className="flex flex-col h-full justify-center">
        <div className="flex items-center justify-center flex-grow">
          <Landing />
        </div>
        <div className="flex items-center justify-center flex-grow">
          <MainPage mainDescription={"Hello! This is placeholder \n text"} />
        </div>
        <div className="flex items-center justify-center flex-grow">
          <PostBubble props={defaultPostProps}/>
        </div>
      </div>
      <div className="fixed top-0 right-0 z-10">
        <Event props={defaultEventsProps}/>
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
