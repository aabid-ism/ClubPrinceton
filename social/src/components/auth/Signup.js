// Signup.jsx
import { useState } from 'react';
import React, { useEffect } from "react";

// import { Link } from "react-router-dom";
// import useFetch from "../hooks/useFetch/UseFetch";
import { useNavigate } from 'react-router-dom';
// https://developers.google.com/identity/gsi/web/reference/js-reference

const Signup = () => {
    // const { handleGoogle, loading, error } = useFetch(
    //     `${process.env.REACT_APP_SERVER_URL}/auth/signup`
    // );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogle = async (response) => {
        setLoading(true);
        setError("");
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                setLoading(false);
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data?.user.firstName));
                    const parts = data?.user.email.split("@");
                    localStorage.setItem("netid", parts[0]);
                    localStorage.setItem("profilepic", data?.user.picture);
                    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(data?.user.access_token));
                    // navigate("/");
                    // window.location.reload();
                }
                else {
                    throw new Error(data?.message || data);
                }
            })
            .then(() => {
                console.log("hi");
                if (localStorage.getItem("jwt")) {
                    navigate("/");
                }
            })
            .catch((error) => {
                setError(error?.message);
            });
    };


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
                        cancel_on_tap_outside: false,
                        prompt_parent_id: "g-id-signin",
                        ux_mode: "popup",
                        hd: "princeton.edu"
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
    }, [error]);

    return (
        <>
            {/* <nav style={{ padding: "2rem" }}>
                <Link to="/">Go Back</Link>
            </nav> */}
            <header >
                <center>
                    <h1>Welcome to Club Princeton!</h1>
                    <h2>Sign in to continue</h2>
                </center>

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
                {/* {localStorage.getItem('user') && < Navigate to="/" />} */}
            </main>
            <footer></footer>
        </>
    );
};

export default Signup;