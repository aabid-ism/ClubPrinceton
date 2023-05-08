import { useState } from 'react';
import {Container, Row, Col, Button, Modal, Navbar, ButtonGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'
import './HomePageMin.css'
import SearchBar from '../searchBar/SearchBar';
import MainPage from "../mainpage/MainPage";
import Announce from '../announcement/Announce';
import Navigation from "../navigation/Navigation";
import UserRating from '../ratings/UserRating';
import { OvrRating } from '../clubRating/OvrRating';
import { FaSearch, FaBars, FaCheck } from 'react-icons/fa';
import { ClubRtgBreakdown } from '../clubRating/ClubRtgBreakdown';

function LandingPage({user}){
    return(
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
    );
}

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
            <LandingPage user={user}/>
        :
        <div>
            <Container fluid className="page">
                <Navbar sticky='top' className='search-top'>
                    <ButtonGroup>
                        <Button 
                            className='d-none d-md-block toggle-button'
                            size='lg'
                            onClick={handleNavShow}
                            variant='secondary'
                        >
                            Navigation
                        </Button>
                        <Button className='d-md-none toggle-button'
                            onClick={handleNavShow}
                            variant='secondary'
                        >
                            <FaBars />
                        </Button>
                    </ButtonGroup>
                    
                    <Button
                        size='lg'
                        onClick={handleSearchShow}
                        className='open-search-button'
                        variant='secondary'
                        
                        >
                        <div className='d-flex justify-content-center align-items-center'>
                            <FaSearch className="mr-2"/>
                            {clubName !== undefined ? clubName : "Search"}
                        </div>
                    </Button>
                    <ButtonGroup>
                        <Button 
                            className='d-none d-md-block toggle-button'
                            size='lg'
                            onClick={handleRateShow}
                            variant='secondary'
                        >
                            Rate Club
                        </Button>
                        <Button className='d-md-none toggle-button'
                            onClick={handleRateShow}
                            variant='secondary'
                        >
                            <FaCheck />
                        </Button>
                    </ButtonGroup>
                </Navbar>
                <Row >
                    <Col  lg={1} >
                    </Col>
                    <Col  lg={10} className="d-flex justify-content-center">
                        <Container >
                            <div className='page-content'>
                                {clubName && (
                                    <div>
                                        <MainPage />
                                        <OvrRating />
                                    </div>
                                )}
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
                    <Modal.Body className="nav">
                        <Navigation/>
                    </Modal.Body>
                </Modal>

                <Modal className='rate-modal'
                    show={showRatingBar}
                    onHide={handleRateClose}
                    size='lg'
                    centered={true}
                >
                    <Modal.Body className="rtg-bubble" >
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