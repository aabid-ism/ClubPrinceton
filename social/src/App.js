import './App.css';
import Landing from './components/landing/Landing.js';
import MainBubble from './components/mainpage/MainPage';
import SearchBar from './components/searchBar/SearchBar';

function App() {
  return (
    <div>
    <Landing></Landing>
    <SearchBar></SearchBar>
    <MainBubble></MainBubble>
    </div>
  );
}

export default App;
