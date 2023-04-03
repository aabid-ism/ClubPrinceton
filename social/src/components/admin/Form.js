import React from "react"
import './admin.css'
import { useMemo, useState, useRef } from "react";
import axios from "axios";

function Form({ state, dispatchFile, dispatchCaption, dispatchTitle, dispatchClearForm }) {

    const url = "http://localhost:5050/posts/create"
    const fileInputRef = useRef(null);
    const [missingCaption, setMissingCaption] = useState(false);
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingFile, setMissingFile] = useState(false);
    
    const isDisabled = useMemo(() => {
        return !!Object.values(state.inputs).some(input => !input)
      }, [inputs])
    const handleOnSubmit = (e) => {
        // preventing default refresh of forms
        e.preventDefault()
        // console.log(`sending post: ${state.title} with caption: ${state.caption} and filename: ${state.image.name}`)

        // resetting error fields of input fields
        setMissingCaption(false);
        setMissingCaption(false);
        setMissingCaption(false);

        // giving user error if form fields are empty
        if (state.inputs.title === null || state.inputs.title === "") {
            setMissingTitle(true);
        }
        if (state.inputs.caption === null || state.inputs.caption === "") {
            setMissingCaption(true);
        }
        if (state.inputs.file === null || state.inputs.file === "") {
            setMissingFile(true);
        }

        console.log(missingCaption, missingFile, missingTitle);
        if (missingCaption || missingFile || missingTitle) {
            console.log("returning!")
            return;
        }

        // request object to be sent to post endpoint 
        const post_request_data = {
            // TODO: need to change with the correct netID from cookies!!!
            netId: "ai4295",
            title: state.inputs.title,
            club: state.activeClub,
            caption: state.inputs.caption,
            image_url: state.inputs.file[0].name
        };

        // sending POST request to post endpoint
        axios
            .post(`${url}`, post_request_data)
            .then((response) => {
                const data = response.data;
                console.log(data);
                alert('Form submitted successfully!');
                // clearing form fields after successful submission of form
                dispatchClearForm();
                fileInputRef.current.value = null;
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
    }
    return (
        <>
            <div>
                <p className="display-6 text-center mb-3">Publish Post</p>
                <p className="display-6 text-center mb-3">{state.activeClub}</p>
            </div>
            <div className="mb-5 d-flex align-items-center justify-content-center" style={{ margin: " 30 px" }}>
                {/* <Preview {...inputs} /> */}
                <form className="mb-2" style={{ margin: "30px", textAlign: "left" }} onSubmit={(e) => handleOnSubmit(e)}>
                    {!state.inputs.title && <div> <p style={{ color: "red" }}> Please fill in the Title!</p></div>}
                    <div className="mb-3" >
                        {/* TITLE */}
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={state.inputs.title}
                                placeholder="Insert Title..."
                                aria-describedby="text"
                                onChange={(e) => dispatchTitle(e.target.value)}
                            />
                        </div>
                        {/* CAPTION */}
                        {!state.inputs.caption && <div> <p style={{ color: "red" }}> Please fill in the Caption!</p></div>}
                        <textarea
                            placeholder="start writing your post..."
                            id="caption" name="post_description"
                            value={state.inputs.caption}
                            onChange={(e) => dispatchCaption(e.target.value)}
                            rows="6"
                            cols="50" >
                        </textarea>
                    </div>
                    {/* IMAGE UPLOAD */}
                    {!state.inputs.file && <div> <p style={{ color: "red" }}> Please upload a file!</p></div>}
                    <div className="mb-3">
                        <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                        <input id="image_uploads"
                            type="file"
                            className="form-control"
                            name="file"
                            // value={state.inputs.file}
                            ref={fileInputRef}
                            onChange={(e) => dispatchFile(e.target.files)}
                            accept="image/png, image/jpeg" />
                    </div>
                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-success float-end"
                        disabled={state.activeClub ? false : true}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )

}
export default Form;