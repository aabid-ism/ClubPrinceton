import React from "react";
import { FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";


import ClubForm from "../clubForm/ClubForm";
import PopUpBtn from "../clubForm/PopUpBtn";

function Navigation(props) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Handle the click event here
    localStorage.clear();
    // navigate("/signup");

  }


  return (
    <div className="nav" style={{ width: `${props.width}px`, height: `${props.height}px` }}>
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
        {/* <li>
          <a href="/" className="nav-link">
            <FaCog className="nav-icon" />
            Settings
          </a>
        </li> */}
        <li onClick={handleClick}>
          <a href="/" className="nav-link orange-oval-text">
            {/* <FaSignOutAlt className="nav-icon" /> */}
            Logout
          </a>
        </li>
        {/* <li>
          <a href="/" className="nav-link">
            <FaQuestionCircle className="nav-icon" />
            FAQ
          </a>
        </li> */}
      </ul>
    </div>
  );
}

export default Navigation;
