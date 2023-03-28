import './admin.css'
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

const url = "http://localhost:5050/clubs/admin";

function Sidebar() {
    
    const [clubs, setClubs] = useState([]);

    // at start time, get a list of clubs that the user is an admin for
    useEffect(() => {
        // TODO: get username from loggedin cookies or wtvr
        const username = "ai4295"
        // get clubs
        axios.get(`${url}/${username}`).then((response) => {
          const data = response.data;
          console.log(data);
          setClubs(data);
        })
        .catch((error) => {
          console.log("Error occurred: ", error);
        });
      }, 
      []);


  return (
    <div className="sidebar">
        {/* render club list using clubs that the netid is an admin of */}
      <ul>
        {/* <li>Hi </li> */}
      {clubs.map((club, index) => (
              <button key = {index} className="text-gray-700 mb-2 border-b border-gray-300">
                {club}
              </button>
            ))}
      </ul>
    </div>
  );
}

export default Sidebar;
