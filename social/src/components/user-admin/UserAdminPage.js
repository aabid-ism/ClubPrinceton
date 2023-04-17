import React, { useReducer } from "react"
import "./UserAdmin.css"

export default function UserAdminPage({ props }) {
    // const [publishType, togglePublishType] = useState("Post")
    return(
        <div className="admin">
            <div className="publish">
                <PostPublish/>
            </div>
            <div className="members"></div>
        </div>
    )
}

function reducer(state, action) {
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
    const [state, dispatch] = useReducer(reducer, initPostInfoState)

    function handlePostInputChange(e){
        dispatch({
            type: e.target.name,
            input: e.target.value
        })
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
                    <div className="info-input-file">
                        <input 
                            type="file" 
                            name="file-input" 
                            onInput={handlePostInputChange} 
                            className="file-button"/>
                    </div>
                </div>
            </div>
            <button className="admin-button" onClick={() => {console.log(JSON.stringify(state, undefined, 2))}}>Publish</button>
        </div>
    )
}

