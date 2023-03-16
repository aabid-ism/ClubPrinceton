import React from "react";
import { FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";

function Navigation(props) {
  const navStyle = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: "#FFE4CC",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "black",
    textDecoration: "none",
    margin: "10px",
  };

  const iconStyle = {
    color: "#999999",
    marginRight: "10px",
    fontSize: "24px",
  };

  return (
    <div style={navStyle}>
      <ul className="flex flex-col justify-center items-center h-full">
        <li>
          <a href="/" style={linkStyle}>
            Home
          </a>
        </li>
        <li>
          <a href="/" style={linkStyle}>
            About Club Princeton
          </a>
        </li>
        <li>
          <a href="/" style={linkStyle}>
            <FaCog style={iconStyle} />
            Settings
          </a>
        </li>
        <li>
          <a href="/" style={linkStyle}>
            <FaSignOutAlt style={iconStyle} />
            Logout
          </a>
        </li>
        <li>
          <a href="/" style={linkStyle}>
            <FaQuestionCircle style={iconStyle} />
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
