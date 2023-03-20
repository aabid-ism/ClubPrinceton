import './App.css';
import Landing from './components/landing/Landing.js';
import MainBubble from './components/mainpage/MainPage';
import SearchBar from './components/searchBar/SearchBar';
import HomePage from './components/homePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
