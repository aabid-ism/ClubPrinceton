import { useState } from 'react';
import {Container, Row, Col, Button, Modal, Navbar} from 'react-bootstrap'
import './HomePageMin.css'
import SearchBar from '../searchBar/SearchBar';
import MainPage from "../mainpage/MainPage";
import Announce from '../announcement/Announce';
import Navigation from "../navigation/Navigation";
import UserRating from '../ratings/UserRating';
import { OvrRating } from '../clubRating/OvrRating';
import { FaSearch } from 'react-icons/fa';
import { ClubRtgBreakdown } from '../clubRating/ClubRtgBreakdown';

export default function HomePageMin({children, clubName, user}){
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);
    const [showRatingBar, setShowRatingBar] = useState(false);

    const handleSearchClose = () => {setShowSearchBar(false)};
    const handleSearchShow = () => {setShowSearchBar(true)};
    const handleNavClose = () => {setShowNavBar(false)};
    const handleNavShow = () => {setShowNavBar(true)};
    const handleRateClose = () => {setShowRatingBar(false)};
    const handleRateShow = () => {setShowRatingBar(true)};

    return (
        clubName === undefined ? 
        <div>
            <Container fluid className="landing-page">
                
                <Row>
                    <Col sm={3}>
                    </Col>
                    <Col sm={6}>
                        <Welcome user={user}/>
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
                    <Button size='lg'
                        onClick={handleNavShow}>
                        Navigation
                    </Button>
                    <Button
                        size='lg'
                        onClick={handleSearchShow}
                        className='open-search-button'
                        variant='secondary'
                        
                        >
                        <FaSearch/>
                        {clubName !== undefined ? clubName : "Search"}
                    </Button>
                    <Button size='lg' className='text-nowrap'
                        onClick={handleRateShow}>
                        Rate Club!
                    </Button>
                </Navbar>
                <Row >
                    <Col  lg={1} >
                    </Col>
                    <Col  lg={10} className="d-flex justify-content-center">
                        <Container >
                            <div className='page-content'>
                                {clubName && (<MainPage />)}
                                <Row className='announce-rating'>
                                    <Col>
                                        {clubName && (<Announce />)}
                                    </Col>
                                    <Col>
                                        {clubName && (<ClubRtgBreakdown/>)}
                                    </Col>
                                </Row>
                                {children}
                            </div>
                        </Container>
                    </Col>
                    <Col  lg={1}>
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
                {/* <Navbar expand='lg' className='nav-button'>
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
                </Navbar> */}
                <Modal className='search-modal'
                    show={showSearchBar}
                    onHide={handleSearchClose}
                    size='lg'
                    centered={true}
                >
                    <Modal.Body className='search-bar'>
                        <SearchBar />
                    </Modal.Body>
                </Modal>

                <Modal className='nav-modal'
                    show={showNavBar}
                    onHide={handleNavClose}
                    size='lg'
                    centered={true}
                >
                    <Modal.Body className=''>
                        <Navigation/>
                    </Modal.Body>
                </Modal>

                <Modal className='rate-modal'
                    show={showRatingBar}
                    onHide={handleRateClose}
                    size='lg'
                    centered={true}
                >
                    <Modal.Body className=''>
                        {clubName && <UserRating/>}
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}

function Welcome({ user }){
    return (
        <>
            {/* <div>
                <h1
                style={{
                    fontSize: "3.5rem",
                    color: "#2c3e50",
                    fontWeight: "bold",
                    marginRight: "10px",
                }}
                >
                Welcome to
                </h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h1
                        style={{
                        fontSize: "3.5rem",
                        color: "orange",
                        fontWeight: "bold",
                        }}
                    >
                        Club
                    </h1>
                    <h1
                        style={{
                        fontSize: "3.5rem",
                        color: "#2c3e50",
                        fontWeight: "bold",
                        }}
                    >
                        Princeton!
                    </h1>
                </div>
            </div> */}
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
        </>
    )
}