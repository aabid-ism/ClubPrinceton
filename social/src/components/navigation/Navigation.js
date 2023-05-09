import React from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import PopUpBtn from "../clubForm/PopUpBtn";

/* Navigation bar for the website 
  @param - none
  @return - navigation bar
*/
function Navigation() {

  const navigate = useNavigate();

  // logout the user
  const handleLogout = (event) => {
    localStorage.clear();
  }


  return (
    <div >
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

        <li onClick={handleLogout}>
          <a href="/" className="nav-link orange-oval-text">
            Logout
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Navigation;
