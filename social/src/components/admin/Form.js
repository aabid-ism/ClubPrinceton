import React from "react"
import './admin.css'
function Form() {
    return (
        <div>
            <div>
                <p className="display-6 text-center mb-3">Publish Post</p>
            </div>
            <div className="mb-5 d-flex align-items-center justify-content-center" style={{ margin: " 30 px" }}>
                {/* <Preview {...inputs} /> */}
                <form className="mb-2" style={{ margin: "30px", textAlign: "left" }} onSubmit={console.log("submit")}>
                    <div className="mb-3" >
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="post"
                                placeholder="Insert Caption..."
                                aria-describedby="text"
                                onChange={console.log("change")}
                            />
                        </div>

                        <textarea placeholder="start writing your post..." id="description" name="description" rows="6" cols="50" ></textarea>
                    </div>
                    <div className="mb-3">
                        <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                        <input id="image_uploads" type="file" className="form-control" name="file" onChange={console.log("change")} accept="image/png, image/jpeg" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success float-end"
                        disabled="True"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;