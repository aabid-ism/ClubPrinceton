import React from "react";
import { FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./Navigation.css";

function Navigation(props) {
  return (
    <div className="nav" style={{ width: `${props.width}px`, height: `${props.height}px` }}>
      <ul className="nav-list">
        <li>
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            About Club Princeton
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            <FaCog className="nav-icon" />
            Settings
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            <FaSignOutAlt className="nav-icon" />
            Logout
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            <FaQuestionCircle className="nav-icon" />
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
