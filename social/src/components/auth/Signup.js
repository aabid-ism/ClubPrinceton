// Signup.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch/UseFetch";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Signup = () => {
    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`
    );

    useEffect(() => {
        /* checking if global google object exists in window. 
            (check index.html script import) */
        if (window.google) {

            // initialize the google sign-in API
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            // render the google sign-in button
            google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                // type: "standard",
                theme: "filled_black",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });

            // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    return (
        <>
            <nav style={{ padding: "2rem" }}>
                <Link to="/">Go Back</Link>
            </nav>
            <header style={{ textAlign: "center" }}>
                <h1>Register to continue</h1>
            </header>
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading ? (
                    <div>Loading....</div>
                ) : (
                    <div id="signUpDiv" data-text="signup_with"></div>
                )}
            </main>
            <footer></footer>
        </>
    );
};

export default Signup;