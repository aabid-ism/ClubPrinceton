import React from "react";
import "./admin.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
function AdminNavBar() {
    /* refactor into separate file later */
    /* fixed="top" */
    return (
        <Navbar className="navbar-color" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#home">ClubPrinceton for Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="orange-oval-text"><strong>Home</strong></Nav.Link>
                        <Nav.Link href="/logout" className="orange-oval-text"><strong>Logout</strong></Nav.Link>
                        <Nav.Link href="/clubform" className="orange-oval-text"><strong>Submit Club</strong></Nav.Link>
                        {/* <NavDropdown title="TestDropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item></NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavBar;