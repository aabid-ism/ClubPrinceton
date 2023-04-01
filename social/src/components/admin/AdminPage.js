import './admin.css';
import Form from './Form';
import Sidebar from './Sidebar';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    clubs: [],
    activeClub: "",
    inputs: { title: null, caption: null, file: null, path: null },
}

const handleOnChangeFile = (state, e) => {
    return { ...state.inputs, file: e.target.files[0] }
}
const handleOnChangeCaption = (state, e) => {
    return { ...state.inputs, caption: e.target.value }
}
const handleOnChangeTitle = (state, e) => {
    return { ...state.inputs, title: e.target.value }
}


function reducer(state, action) {
    switch (action.type) {
        case "setClubs":
            return {
                ...state,
                clubs: action.payload.value
            }

        case "setActiveClub":
            return {
                ...state,
                activeClub: action.payload.value
            }

        case "setCaption":
            return {
                ...state,
                inputs: handleOnChangeCaption(state, action.payload.value)
            }

        case "setTitle":
            return {
                ...state,
                inputs: handleOnChangeTitle(state, action.payload.value)
            }

        case "setFile":
            return {
                ...state,
                inputs: handleOnChangeFile(state, action.payload.value)
            }

        // case 'collapse':
        //     return {
        //         ...state,
        //         isCollapsed: action.payload.bool
        //     }
        default: return state
    }
}

function AdminInterface() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchCaption = (e) => dispatch({ type: 'setCaption', payload: { value: e } })
    const dispatchTitle = (e) => dispatch({ type: 'setTitle', payload: { value: e } })
    const dispatchFile = (e) => dispatch({ type: 'setFile', payload: { value: e } })
    const dispatchActiveClub = (club) => dispatch({ type: 'setActiveClub', payload: { value: club } })

    const url = "http://localhost:5050/clubs/admin";

    // at start time, get a list of clubs that the user is an admin for
    useEffect(() => {
        // TODO: get username from loggedin cookies
        const username = "ai4295" || null;

        // get clubs that the user is an admin of
        axios.get(`${url}/${username}`).then((response) => {
            const data = response.data;
            console.log(data);
            // setClubs(data);
            dispatch({ type: 'setClubs', payload: { value: data } })
        }).catch((error) => {
            console.log("Error occurred: ", error);
        });
    },
        []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar state={state} dispatchActiveClub={dispatchActiveClub} />
            <main>
                <div>
                    {/* <div style={{width: "18rem"}}>
                <img src={myImage} />
            </div> */}
                    <Form state={state} dispatchCaption={dispatchCaption} dispatchFile={dispatchFile} dispatchTitle={dispatchTitle} />
                </div>
            </main>
        </div>
    )
}

export default AdminInterface;