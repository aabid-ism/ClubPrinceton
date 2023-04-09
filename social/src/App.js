<<<<<<< HEAD
import "./App.css";
import React from "react";
import Landing from "./components/landing/Landing.js";
import MainBubble from "./components/mainpage/MainPage";
import SearchBar from "./components/searchBar/SearchBar";
import HomePage from "./components/homePage/HomePage";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <HomePage></HomePage>
      </Provider>
    </React.StrictMode>
=======
import './App.css';
import Landing from './components/landing/Landing.js';
import MainBubble from './components/mainpage/MainPage';
import SearchBar from './components/searchBar/SearchBar';
import HomePage from './components/homePage/HomePage';
import Bubble from './components/bubble/Bubble';
import RatingStars from './components/ratings/SingleRating';
import SingleRating from './components/ratings/SingleRating';
import UserRating from './components/ratings/UserRating';
import OverallRating from './components/ratings/OverallRating';

function App() {
  return (
    <div>
      <OverallRating></OverallRating>
    </div>
>>>>>>> 92628d23bb98d576060aedf032a309d952de910e
  );
}

export default App;
