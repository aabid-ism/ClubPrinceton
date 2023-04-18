// Signup.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch/UseFetch";
import { Navigate } from 'react-router-dom';
// https://developers.google.com/identity/gsi/web/reference/js-reference

const Signup = () => {
    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`
    );

    useEffect(() => {
        /* checking if global google object exists in window. 
            (check index.html script import) */
        // Load the Google Sign-In API script
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Wait for the script to load
        script.onload = () => {
            // Wait for the google object to become available
            const google = window.google;
            const waitGoogle = setInterval(() => {
                if (window.google && window.google.accounts) {
                    clearInterval(waitGoogle);
                    // Initialize the Google Sign-In API
                    google.accounts.id.initialize({
                        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        callback: handleGoogle,
                    });

                    // Render the Google Sign-In button
                    google.accounts.id.renderButton(
                        document.getElementById("signUpDiv"),
                        {
                            theme: "filled_black",
                            text: "continue_with",
                            shape: "pill",
                        }
                    );
                }
            }, 100);
        };
    }, [handleGoogle]);

    return (
        <>
            {/* <nav style={{ padding: "2rem" }}>
                <Link to="/">Go Back</Link>
            </nav> */}
            <header style={{ textAlign: "center" }}>
                <h1>Sign in to continue</h1>
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
                {localStorage.getItem('user') && < Navigate to="/" />}
            </main>
            <footer></footer>
        </>
    );
};

export default Signup;