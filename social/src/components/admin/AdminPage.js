import './admin.css';
import Form from './Form';
import Sidebar from './Sidebar';
import { useEffect, useReducer } from 'react';
import Rightbar from './Rightbar';
import DeletePostComponent from './DeletePostComponent';
import api from '../auth/api';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import AdminNavBar from './AdminNavbar';
// state of the initial input fields
const initialState = {
    clubs: [],
    activeClub: "",
    inputs: { title: "", caption: "", file: null },
    missingValues: {
        title: false,
        caption: false,
        image: false
    },
    isSubmitted: false
}

function reducer(state, action) {
    switch (action.type) {
        // setting the clubs that a user is allowed to administer: left sidebar
        case "setClubs":
            return {
                ...state,
                clubs: action.payload.value
            }
        // current club that the user is administering
        case "setActiveClub":
            return {
                ...state,
                activeClub: action.payload.value
            }
        // capturing the caption of the form field and putting it to state
        case "setCaption":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    caption: action.payload.value
                }
            }
        // capturing the title of the form field and putting it to state
        case "setTitle":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    title: action.payload.value
                }
            }
        // capturing the file of the form field and putting it to state
        case "setFile":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    file: action.payload.value
                }
            }
        // set the missing value boolean on the right form field
        case "setMissingValues":
            return {
                ...state,
                missingValues: {
                    ...state.missingValues,
                    [action.payload.key]: action.payload.value,
                }
            }
        // clearing the form fields from state
        case "clear_form":
            return {
                ...state,
                inputs: { title: "", caption: "", file: "" }
            }

        // setting the isSubmitted boolean
        case "submit":
            return {
                ...state,
                isSubmitted: action.payload.value
            }

        default: return state
    }
}

function AdminInterface() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // dispatch functions for all action types
    const dispatchSetClubs = (clubs) => dispatch({ type: 'setClubs', payload: { value: clubs } });
    const dispatchCaption = (caption) => dispatch({ type: 'setCaption', payload: { value: caption } });
    const dispatchTitle = (title) => dispatch({ type: 'setTitle', payload: { value: title } });
    const dispatchFile = (file) => dispatch({ type: 'setFile', payload: { value: file } });
    const dispatchActiveClub = (club) => dispatch({ type: 'setActiveClub', payload: { value: club } });
    const dispatchClearForm = () => dispatch({ type: 'clear_form' });
    const dispatchSubmit = (value) => dispatch({ type: 'submit', payload: { value: value } });
    const dispatchMissingValues = (missingInputType, missingBool) => dispatch({
        type: 'setMissingValues',
        payload: { key: missingInputType, value: missingBool }
    });

    // endpoint to get the clubs that a user has permission to administer
    // const url = `${process.env.REACT_APP_SERVER_URL}/clubs/admin`;

    // at start time, get a list of clubs that the user is an admin for
    useEffect(() => {

        const username = localStorage.getItem("netid") || null;
        api.get(`/clubs/admin/${username}`)
            .then((response) => {
                dispatchSetClubs(response.data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
    },
        []);

    return (
        <Container fluid className="admin-container-color">
            {/* refactor into separate file later */}
            {/* fixed="top" */}
            <AdminNavBar />

            {
                !state.activeClub &&
                <Row className='full-height'>
                    <Col lg={2} className="initial-clublist">
                        <Sidebar state={state} dispatchActiveClub={dispatchActiveClub} />
                    </Col>
                    <Col lg={10} className="initial-welcome d-flex align-items-center justify-content-center flex-column">
                        <h1>Welcome to ClubPrinceton for Admin</h1>
                        <div className="text-center mb-3">
                            <h3>If you are a registered administrator for a club page, please select your club page in the My Clubs section.</h3>
                        </div>
                    </Col>
                </Row>
            }

            {state.activeClub &&
                <Row className="admin-page-row full-height">
                    <Col className="left-sidebar-col">
                        <Sidebar state={state} dispatchActiveClub={dispatchActiveClub} />
                    </Col>
                    {/* Main Page with Form and Delete-Posts widget */}
                    <Col className="middle-form-col" lg={8}>

                        <Row lg>
                            {state.activeClub &&
                                <Form state={state}
                                    dispatchClearForm={dispatchClearForm}
                                    dispatchCaption={dispatchCaption}
                                    dispatchFile={dispatchFile}
                                    dispatchTitle={dispatchTitle}
                                    dispatchMissingValues={dispatchMissingValues}
                                    dispatchSubmit={dispatchSubmit}
                                />
                            }
                        </Row>
                        <Row className="middle-delete-posts-row" lg>
                            <div>
                                {state.activeClub && <DeletePostComponent state={state} />}
                            </div>
                        </Row>
                    </Col>
                    <Col className="right-sidebar-col" lg>
                        <Rightbar state={state} />
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default AdminInterface;