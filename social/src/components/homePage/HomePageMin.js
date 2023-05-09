import { useState } from 'react';
import {Container, Row, Col, Button, Modal, Navbar, ButtonGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'
import './HomePageMin.css'
import SearchBar, {formatTitle} from '../searchBar/SearchBar';
import MainPage from "../mainpage/MainPage";
import Announce from '../announcement/Announce';
import Navigation from "../navigation/Navigation";
import UserRating from '../ratings/UserRating';
import { OvrRating } from '../clubRating/OvrRating';
import { FaSearch, FaBars, FaStar } from 'react-icons/fa';
import { ClubRtgBreakdown } from '../clubRating/ClubRtgBreakdown';

/* Home page for the website
    @param - none
    @return - home page
*/
export default function HomePageMin({children, clubName, user}){
    const [showRatingBar, setShowRatingBar] = useState(false);
    const [showLandingNav, setShowLandingNav] = useState(false);
    
    const handleLandingNavClose = () => {setShowLandingNav(false)};
    const handleLandingNavShow = () => {setShowLandingNav(true)};
    const handleRateClose = () => {setShowRatingBar(false)};
    const handleRateShow = () => {setShowRatingBar(true)};

    return (
        clubName === undefined ? 
        <Container fluid className="landing-page">
                
            <Row>
                <Col sm={3}>
                </Col>
                <Col sm={6}>
                    <div className='page-content'>
                        <Welcome user={user}/>
                        <div className='search-bar-landing'>
                            <SearchBar />
                        </div>
                        <Container className='d-flex justify-content-center'>
                                <Button
                                    className=' toggle-button landing-settings'
                                    onClick={handleLandingNavShow}
                                    variant='secondary'
                                >
                                    Settings    
                                </Button>
                        </Container>
                    </div>
                </Col>
                <Col sm={3}>
                </Col>
            </Row>
            <Modal className='nav-modal'
                    show={showLandingNav}
                    onHide={handleLandingNavClose}
                    size='lg'
                    centered={true}
                >
                    <div className="nav">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body >
                        <Navigation/>
                    </Modal.Body>
                </div>
                </Modal>
        </Container>
        :
        <div>
            <Container fluid className="page">
                <Navbar sticky='top' className='search-top'>
                    <NavModal/>
                    <SearchModal clubName={clubName}/>
                    
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
                            <FaStar />
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
                                        <MainPage />                          
                                )}
                                {clubName && (
                                        <OvrRating />                        
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
                <Modal className='rate-modal'
                    show={showRatingBar}
                    onHide={handleRateClose}
                    size='lg'
                    centered={true}
                >
                    <div className="rtg-bubble">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body  >
                            {clubName && <UserRating/>}
                        </Modal.Body>
                    </div>
                </Modal>
            </Container>
        </div>
    );
}

/* Welcome message for the user
    @param - none
    @return - welcome message
*/
function Welcome({ user }){
    return (
        <>
            <div className='club-pton-welcome'>
                <h1
                style={{
                    color: "#2c3e50",
                    marginRight: "10px",
                }}
                >
                Welcome to
                </h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h1
                        style={{
                        color: "orange",
                        }}
                    >
                        Club
                    </h1>
                    <h1
                        style={{
                        color: "#2c3e50",
                        }}
                    >
                        Princeton!
                    </h1>
                </div>
            </div>
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
/* Navigation modal for the website
    @param - none
    @return - navigation modal
*/
function NavModal({}){
    const [showNavBar, setShowNavBar] = useState(false);
    const handleNavClose = () => {setShowNavBar(false)};
    const handleNavShow = () => {setShowNavBar(true)};
    return(
        <>
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
            <Modal className='nav-modal'
                show={showNavBar}
                onHide={handleNavClose}
                size='lg'
                centered={true}
            >
                <div className="nav">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body >
                        <Navigation/>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

/* Search modal for the website
    @param - props containing club name
    @return - search modal
*/
function SearchModal({clubName}){
    const [showSearchBar, setShowSearchBar] = useState(false);
    const handleSearchClose = () => {setShowSearchBar(false)};
    const handleSearchShow = () => {setShowSearchBar(true)};
    return(<>
        <Button
            size='lg'
            onClick={handleSearchShow}
            className='open-search-button'
            variant='secondary'
        
            >
            <div className='d-flex justify-content-center align-items-center'>
                <FaSearch className="mr-2"/>
                <div className='top-search-text'>
                    {clubName !== undefined ? formatTitle(clubName, 20) : "Search"}
                </div>
            </div>
        </Button>
        <Modal className='search-modal'
        show={showSearchBar}
        onHide={handleSearchClose}
        size='lg'
        centered={true}
        >
        <div className='search-bar'>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <SearchBar />
            </Modal.Body>
        </div>
        </Modal>
    </>);
}