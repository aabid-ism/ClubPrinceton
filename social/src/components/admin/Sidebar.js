import './admin.css'
import React from 'react';

function Sidebar({ state, dispatchActiveClub }) {

  return (
    <div className="sidebar">
      <div className="my-clubs-title"><h3>My Clubs</h3></div>
      {/* render club list using clubs that the netid is an admin of */}
      <ul>
        {/* <li>Hi </li> */}
        {state.clubs?.map((club, index) => (
          <button
            key={index}
            className="text-gray-700 mb-2 border-b border-gray-300 my-clubs-title"
            onClick={(e) => dispatchActiveClub(club)}
          >
            {club}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
