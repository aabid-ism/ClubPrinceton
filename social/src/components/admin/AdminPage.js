import './admin.css';
import Form from './Form';
import Sidebar from './Sidebar';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

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

const handleOnChangeFile = (state, file) => {
    return { ...state.inputs, file: file }
}
const handleOnChangeCaption = (state, caption) => {
    return { ...state.inputs, caption: caption }
}
const handleOnChangeTitle = (state, title) => {
    return { ...state.inputs, title: title }
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
        case "setMissingValues":
            return {
                ...state,
                missingValues: {
                    ...state.missingValues,
                    [action.payload.key]: action.payload.value,
                }
            }

        case "clear_form":
            return {
                ...state,
                inputs: { title: "", caption: "", file: "" }
            }

        case "submit":
            return {
                ...state,
                isSubmitted: action.payload.value
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
                    <Form state={state}
                        dispatchClearForm={dispatchClearForm}
                        dispatchCaption={dispatchCaption}
                        dispatchFile={dispatchFile}
                        dispatchTitle={dispatchTitle}
                        dispatchMissingValues={dispatchMissingValues}
                        dispatchSubmit={dispatchSubmit}
                    />
                </div>
            </main>
        </div>
    )
}

export default AdminInterface;