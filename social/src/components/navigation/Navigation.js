import React from "react";
import { FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";

function Navigation(props) {
  return (
    <div
      className={`w-${props.width} mx-auto p-6 bg-white rounded-lg shadow-lg my-10`}
      style={{ height: `${props.height}px` }}
    >
      <ul className="flex flex-col justify-center items-center h-full">
        <li className="mb-4">
          <a href="/" className="font-bold">
            Home
          </a>
        </li>
        <li className="mb-4">
          <a href="/" className="font-bold">
            About Club Princeton
          </a>
        </li>
        <li className="mb-4">
          <a href="/" className="flex items-center font-bold">
            <FaCog className="text-gray-600 hover:text-gray-800" size={24} />
            <span className="ml-2">Settings</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="/" className="flex items-center font-bold">
            <FaSignOutAlt
              className="text-gray-600 hover:text-gray-800"
              size={24}
            />
            <span className="ml-2">Logout</span>
          </a>
        </li>
        <li>
          <a href="/" className="flex items-center font-bold">
            <FaQuestionCircle
              className="text-gray-600 hover:text-gray-800"
              size={24}
            />
            <span className="ml-2">FAQ</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;