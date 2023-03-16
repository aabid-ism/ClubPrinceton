import './App.css';
import Landing from './components/landing/Landing.js';
import MainBubble from './components/mainpage/MainPage';
import SearchBar from './components/searchBar/SearchBar';
import HomePage from './components/homePage/HomePage';
import Bubble from './components/bubble/Bubble';
import RatingStars from './components/ratings/SingleRating';
import SingleRating from './components/ratings/SingleRating';
import UserRating from './components/ratings/UserRating';

function App() {
  return (
    <div>
      <UserRating></UserRating>
    </div>
  );
}

export default App;
