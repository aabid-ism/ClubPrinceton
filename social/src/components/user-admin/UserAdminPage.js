import React, { useReducer, useState } from "react"
import "./UserAdmin.css"

export default function UserAdminPage({ props }) {
    const [publishPost, togglePublishType] = useState(true)
    return(
        <div className="admin">
            <div className="publish">
                {publishPost ? <div>
                    <PostPublish/>
                    <button className="admin-button" onClick={() => {togglePublishType(!publishPost)}}>Switch to Events</button>
                    </div> : <div>
                        <EventPublish/>
                        <button className="admin-button" onClick={() => {togglePublishType(!publishPost)}}>Switch to Posts</button>
                        </div>}
            </div>
            <div className="members"></div>
        </div>
    )
}

// TODO: currently both posts and events can use the same reducer due to
// both only having three inputs, but this may change and need to be broken up
function postReducer(state, action) {
    switch (action.type){
        case "caption-input":
            return {
                ...state,
                caption: action.input
            }
        case "description-input":
            return {
                ...state,
                description: action.input
            }
        case "file-input":
            return {
                ...state,
                image: action.input
            }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

function PostPublish({props}){
    // TODO: logic to get the club that this is a post for
    // TODO: Logic to get the user; hardcoded rn
    const user = 'cspeed';
    const initPostInfoState = {
        caption: "",
        description: "",
        image: {}
    }
    const [state, dispatch] = useReducer(postReducer, initPostInfoState)

    function handlePostInputChange(e){
        dispatch({
            type: e.target.name,
            input: e.target.value
        })
    }

    function submitPost(){
        alert(JSON.stringify(state, undefined, 2))

    }

    return (
        <div className="post-publish">
            <div className="post-publish-title">
                <center>
                    <h1>
                        Publish Post
                    </h1>
                </center>
                <hr/>
            </div>
            <div>
                <div className="post-publish-info">
                    <h2>Post Caption</h2>
                    <input 
                        type="text" 
                        name="caption-input" 
                        onInput={handlePostInputChange} 
                        className="info-input"/>
                </div>
                <div className="post-publish-info">
                    <h2>Post Description</h2>
                    <input type="text" name="description-input" onInput={handlePostInputChange} className="info-input-lg"/>
                </div>
                <div className="post-publish-info">
                    <h2 >Choose Image(.jpg / .png)</h2>
                    <div>
                        <input 
                            type="file" 
                            name="file-input" 
                            onInput={handlePostInputChange} 
                            className="file-button"/>
                    </div>
                </div>
            </div>
            <button className="admin-button" onClick={submitPost}>Publish</button>
        </div>
    )
}

function EventPublish({props}){
    // TODO: logic to get the club that this is a post for
    // TODO: Logic to get the user; hardcoded rn
    const user = 'cspeed';
    const initPostInfoState = {
        caption: "",
        link: "",
        description: ""
    }
    const [state, dispatch] = useReducer(postReducer, initPostInfoState)

    function handlePostInputChange(e){
        dispatch({
            type: e.target.name,
            input: e.target.value
        })
    }

    function submitPost(){
        alert(JSON.stringify(state, undefined, 2))

    }

    return (
        <div className="post-publish">
            <div className="post-publish-title">
                <center>
                    <h1>
                        Publish Event
                    </h1>
                </center>
                <hr/>
            </div>
            <div>
                <div className="post-publish-info">
                    <h2>Event Name</h2>
                    <input 
                        type="text" 
                        name="caption-input" 
                        onInput={handlePostInputChange} 
                        className="info-input"/>
                </div>
                <div className="post-publish-info">
                    <h2>Hyperlink for Event</h2>
                    <input type="text" name="description-input" onInput={handlePostInputChange} className="info-input"/>
                </div>
                <div className="post-publish-info">
                    <h2>Event Description</h2>
                    <input type="text" name="description-input" onInput={handlePostInputChange} className="info-input-lg"/>
                </div>
            </div>
            <button className="admin-button" onClick={submitPost}>Publish</button>
        </div>
    )
}

