import React from "react"
import './admin.css'
import { useRef, useState } from "react";
import axios from "axios";

function Form({ state, dispatchFile, dispatchCaption, dispatchTitle, dispatchClearForm, dispatchMissingValues, dispatchSubmit }) {

    const postUrl = "http://localhost:5050/posts/create"
    const imageUrl = "http://localhost:5050/image_pipeline/"
    const fileInputRef = useRef(null);
    const [azureImageBlobName, setAzureImageBlobName] = useState('');

    const handleOnSubmit = async (e) => {
        // preventing default refresh of forms
        e.preventDefault()
        // console.log(`sending post: ${state.title} with caption: 
        // ${state.caption} and filename: ${state.image.name}`)

        // resetting error fields of input fields after a given submission
        dispatchMissingValues("title", false);
        dispatchMissingValues("caption", false);
        dispatchMissingValues("image", false);

        // you can use a usememo to reduce the trigger of this in every render.
        dispatchSubmit(true);

        // setting error state if an input is missing
        let earlyreturn = false;
        if (state.inputs.title === null || state.inputs.title === "") {
            dispatchMissingValues("title", true)
            earlyreturn = true;
        }
        if (state.inputs.caption === null || state.inputs.caption === "") {
            dispatchMissingValues("caption", true)
            earlyreturn = true;
        }
        if (state.inputs.file === null || state.inputs.file === "") {
            dispatchMissingValues("image", true)
            earlyreturn = true;
        }

        // do not go through with submission if input is missing
        if (earlyreturn) {
            return;
        }

        // sending image to azure
        // create a new FormData object
        const formData = new FormData();

        // append the file to the form data object
        formData.append('file', state.inputs.file[0]);

        // send the file using axios
        await axios.post(imageUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                setAzureImageBlobName(response.data);
                // request object to be sent to post endpoint 
                const post_request_data = {
                    // TODO: need to change with the correct netID from cookies!!!
                    netId: "ai4295",
                    title: state.inputs.title,
                    club: state.activeClub,
                    caption: state.inputs.caption,
                    image_url: response.data
                };
                console.log(response.data);
                // sending POST request to post endpoint
                axios
                    .post(`${postUrl}`, post_request_data)
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

            })
            .catch(error => {
                console.log(error);
                console.log("Unfortunate. very.")
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
                <form encType="multipart/form-data" className="mb-2" style={{ margin: "30px", textAlign: "left" }} onSubmit={(e) => handleOnSubmit(e)}>
                    {state.isSubmitted && state.missingValues.title && <div> <p style={{ color: "red" }}> Please fill in the Title!</p></div>}
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
                        {state.isSubmitted && state.missingValues.caption && <div> <p style={{ color: "red" }}> Please fill in the Caption!</p></div>}
                        <textarea
                            placeholder="start writing your post..."
                            id="caption"
                            name="caption"
                            value={state.inputs.caption}
                            onChange={(e) => dispatchCaption(e.target.value)}
                            rows="6"
                            cols="50" >
                        </textarea>
                    </div>
                    {/* IMAGE UPLOAD */}
                    {state.isSubmitted && state.missingValues.image && <div> <p style={{ color: "red" }}> Please upload a file!</p></div>}
                    <div className="mb-3">
                        <label htmlFor="image_uploads">Choose images to upload (PNG, JPG)</label>
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