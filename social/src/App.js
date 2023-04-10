import "./App.css";
import React from "react";
import Landing from "./components/landing/Landing.js";
import MainBubble from "./components/mainpage/MainPage";
import SearchBar from "./components/searchBar/SearchBar";
import HomePage from "./components/homePage/HomePage";
import store from "./store";
import { Provider } from "react-redux";
import Announce from "./components/announcement/Announce";

function App() {
  return (
    // <React.StrictMode>
    //   <Provider store={store}>
    //     <HomePage></HomePage>
    //   </Provider>
    // </React.StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <Announce></Announce>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
