import './admin.css'
import React from 'react';

function Sidebar({ state, dispatchActiveClub }) {

  return (
    <div className="sidebar">
      <div className="my-clubs-title"><h3>&emsp;My Clubs</h3></div>
      {/* render club list using clubs that the netid is an admin of */}
      <div className='club-names-list'>
        <ul>
          {/* <li>Hi </li> */}
          {state.clubs?.map((club, index) => (
            <button
              key={index}
              className="text-gray-700 mb-2 border-b border-gray-300 my-clubs-title"
              onClick={(e) => dispatchActiveClub(club)}
            >
              <strong>{club}</strong>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
