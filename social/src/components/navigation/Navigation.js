import React from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import PopUpBtn from "../clubForm/PopUpBtn";

function Navigation(props) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Handle the click event here
    localStorage.clear();
    // navigate("/signup");

  }


  return (
    <div className="nav" style={{ width: `${props.width}`, height: `${props.height}` }}>
      <ul className="nav-list">
        <li>
          <a href="/" className="nav-link orange-oval-text">
            Home
          </a>
        </li>
        <li>
          <a href="/admin" className="nav-link orange-oval-text">
            Admin
          </a>
        </li>
        <li>
          <div className="nav-link nav-submit-club-text orange-oval-text">
            <PopUpBtn></PopUpBtn>
          </div>
        </li>

        <li onClick={handleClick}>
          <a href="/" className="nav-link orange-oval-text">
            Logout
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Navigation;
