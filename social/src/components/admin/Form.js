import React from "react"
import './admin.css'
import { useState } from "react";
import axios from "axios";
// const initialState = {
//     inputs: { caption: null, post: null, file: null, path: null },
// }

// function reducer(state, action) {
//     switch (action.type) {
//         case 'setItem':
//             return {
//                 ...state,
//                 items: [state.inputs, ...state.items],
//                 count: state.items.length + 1,
//                 inputs: { title: null, file: null, path: null }
//             }
//         case "setInputs":
//             return {
//                 ...state,
//                 inputs: handleOnChange(state, action.payload.value)
//             }
//         case 'collapse':
//             return {
//                 ...state,
//                 isCollapsed: action.payload.bool
//             }
//         default: return state
//     }
// }




function Form(props) {
    const [title, setTitle] = useState(null);
    const [caption, setCaption] = useState(null);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);

    const url = "http://localhost:5050/posts/create"
    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(`sending post: ${title} with caption: ${caption} and filename: ${image.name}`)
        const post_request_data = {
            netId: user,
            title: title,
            club: props.activeClub,
            caption: caption,
            image_url: image.name
        };
        axios
            .post(`${url}`, post_request_data)
            .then((response) => {
                const data = response.data;
                console.log(data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
    }

    return (
        <>
            <div>
                <p className="display-6 text-center mb-3">Publish Post</p>
                <p className="display-6 text-center mb-3">{props.activeClub}</p>
            </div>
            <div className="mb-5 d-flex align-items-center justify-content-center" style={{ margin: " 30 px" }}>
                {/* <Preview {...inputs} /> */}
                <form className="mb-2" style={{ margin: "30px", textAlign: "left" }} onSubmit={handleOnSubmit}>
                    <div className="mb-3" >
                        {/* TITLE */}
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="caption"
                                placeholder="Insert Caption..."
                                aria-describedby="text"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* CAPTION */}
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="caption"
                                placeholder="Type your motherfuckin' netId..."
                                aria-describedby="text"
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        {/* CAPTION */}
                        <textarea
                            placeholder="start writing your post..."
                            id="description" name="post_description"
                            onChange={(e) => setCaption(e.target.value)}
                            rows="6"
                            cols="50" >
                        </textarea>
                    </div>
                    {/* IMAGE UPLOAD */}
                    <div className="mb-3">
                        <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                        <input id="image_uploads"
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/png, image/jpeg" />
                    </div>
                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-success float-end"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form;