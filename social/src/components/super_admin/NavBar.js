import React from "react";
import { Navbar, Nav } from "react-bootstrap";

/*
  NavBar component for the super admin interface. 
  Contains links to home page, admin page, and logout button.
  To be positioned on top of the page.

  @param: none
  @return: NavBar component
  
*/

function NavBar() {
  // logout function
  const handleClick = (event) => {
    localStorage.clear();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand
        href="/"
        className="orange-oval-text home-link"
        style={{ margin: "10px" }}
      >
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/admin" className="orange-oval-text">
            Admin
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={handleClick}
            href="/"
            className="orange-oval-text"
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
