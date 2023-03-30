import './admin.css'
import React from 'react';




function Sidebar(props) {

  console.log(props.clubs);




  return (
    <div className="sidebar">
      {/* render club list using clubs that the netid is an admin of */}
      <ul>
        {/* <li>Hi </li> */}
        {props.clubs?.map((club, index) => (
          <button
            key={index}
            className="text-gray-700 mb-2 border-b border-gray-300"
            onClick={() => { props.setActiveClub(club) }}
          >

            {club}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
