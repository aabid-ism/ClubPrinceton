import './admin.css'
import React from 'react';
import Button from 'react-bootstrap/esm/Button';

function Sidebar({ state, dispatchActiveClub }) {

  return (
    <div>
      <div class="mb-3">
        {/* If we contain My Clubs in an outer div -> the text will automatically wrap around */}
        <h1>My Clubs</h1>
      </div>
      {/* render club list using clubs that the netid is an admin of */}
      {/* we can use react bootstrap stack here for every button instead of a UL*/}
      <div className='my-clubs-collection'>
        {/* <ul> */}
          {state.clubs?.map((club, index) => (
            <div class="mb-3">
            <Button
              key={index}
              className="orange-button"
              onClick={(e) => dispatchActiveClub(club)}
            >
              <strong>{club}</strong>
            </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
