import React from "react";
import "./admin.css";
import { Navbar, Nav, Container } from "react-bootstrap";

/* 
    The admin navbar component.
    @return the AdminNavBar component
*/

function AdminNavBar() {
    return (
        <Navbar bg="light" className="navbar-color" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#home">ClubPrinceton for Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="orange-oval-text"><strong>Home</strong></Nav.Link>
                        <Nav.Link href="/logout" className="orange-oval-text"><strong>Logout</strong></Nav.Link>
                        <Nav.Link href="/clubform" className="orange-oval-text"><strong>Submit Club</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavBar;