import { useState } from 'react';
import {Container, Row, Col, Button, Modal, Navbar} from 'react-bootstrap'
import './HomePageMin.css'
import SearchBar from '../searchBar/SearchBar';
import MainPage from "../mainpage/MainPage";
import Announce from '../announcement/Announce';
import Navigation from "../navigation/Navigation";
import UserRating from '../ratings/UserRating';
import { FaSearch } from 'react-icons/fa';

export default function HomePageMin({children, clubName, user}){
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);

    const handleClose = () => {setShowSearchBar(false)};
    const handleShow = () => {setShowSearchBar(true)};

    return (
        clubName === undefined ? 
        <div>
            <Container fluid className="landing-page">
                
                <Row>
                    <Col sm={3}>
                    </Col>
                    <Col sm={6}>
                        {user && (
                        <h1
                            style={{
                            fontSize: "2.5rem",
                            color: "#333",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            }}
                        >
                            Hello, {user}!
                        </h1>
                        )}
                        <div className='search-bar-landing'>
                            <SearchBar />
                        </div>
                    </Col>
                    <Col sm={3}>
                    </Col>
                </Row>
            </Container>
        </div> 
        :
        <div>
            <Container fluid className="page">
                <Navbar sticky='top' className='search-top'>
                    <Button
                        size='lg'
                        onClick={handleShow}
                        className='open-search-button'
                        variant='secondary'
                        
                    >
                        <FaSearch/>
                        {clubName !== undefined ? clubName : "Search"}
                    </Button>
                </Navbar>
                <Row >
                    <Col sm={2} lg={1} >
                    </Col>
                    <Col sm={8} lg={10} className="d-flex justify-content-center">
                        <Container >
                            <div className='page-content'>
                                {clubName && (<MainPage />)}
                                {clubName && (<Announce />)}
                                {children}
                            </div>
                        </Container>
                    </Col>
                    <Col sm={2} lg={1}>
                    </Col>
                </Row>
                
                {/* <Container fluid className='nav-plus-rate'>
                    <Navbar expand='lg'>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                            <Container>
                                <Navigation/>
                            </Container>
                        </Navbar.Collapse>
                    </Navbar>
                    <Navbar expand='lg'>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                            <Container>
                                {clubName && <UserRating/>}
                            </Container>
                        </Navbar.Collapse>
                    </Navbar>
                </Container> */}
                <Navbar expand='lg' className='nav-button'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Container>
                            <Navigation/>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar expand='lg' className='rate-button'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Container>
                            {clubName && <UserRating/>}
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
                {/* This modal is for the search bar */}
                <Modal
                    show={showSearchBar}
                    onHide={handleClose}
                    size='lg'
                    centered={true}
                >
                    <Modal.Body className='search-bar'>
                        <SearchBar />
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}