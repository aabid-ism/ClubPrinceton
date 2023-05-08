import './admin.css'
import React from 'react';
import Button from 'react-bootstrap/esm/Button';

function Sidebar({ state, dispatchActiveClub }) {

  return (
    <div>
      <div>
        {/* If we contain My Clubs in an outer div -> the text will automatically wrap around */}
        <h3>My Clubs</h3>
      </div>
      {/* render club list using clubs that the netid is an admin of */}
      {/* we can use react bootstrap stack here for every button instead of a UL*/}
      <div className='my-clubs-collection'>
        {/* <ul> */}
          {state.clubs?.map((club, index) => (
            <div>
            <Button
              key={index}
              className="orange-button"
              onClick={(e) => dispatchActiveClub(club)}
            >
              <strong>{club}</strong>
            </Button>
            </div>
          ))}
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
          <div>The quick brown fox jumps over the lazy dog.</div>
        {/* </ul> */}
      </div>
    </div>
  );
}

export default Sidebar;
