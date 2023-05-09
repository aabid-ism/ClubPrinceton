import "./App.css";
import React from "react";
// import Landing from "./components/auth/Landing.js";
import MainBubble from "./components/mainpage/MainPage";
import SearchBar from "./components/searchBar/SearchBar";
import HomePage from "./components/homePage/HomePage";
import store from "./store";
import { Provider } from "react-redux";
import Announce from "./components/announcement/Announce";

// the main app component
function App() {
  return (
    <Provider store={store}>
      <HomePage></HomePage>
    </Provider>

  );
}

export default App;
