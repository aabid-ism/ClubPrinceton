import { useState } from "react";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
// https://developers.google.com/identity/gsi/web/reference/js-reference

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Google response on successful sign in
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
          localStorage.setItem(
            "user",
            JSON.stringify(data?.user.firstName)
          );
          const parts = data?.user.email.split("@");
          localStorage.setItem("netid", parts[0]);
          localStorage.setItem("profilepic", data?.user.picture);
          localStorage.setItem(
            "ACCESS_TOKEN",
            JSON.stringify(data?.user.ACCESS_TOKEN)
          );

          // window.location.reload();
        } else {
          throw new Error(data?.message || data);
        }
      })
      .then(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
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
            hd: "princeton.edu",
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
    <div
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light text-dark"
      style={{ backgroundColor: "#FFF8E5" }}
    >
      <header className="text-center mb-4">
        <h1 className="display-4">Welcome to Club Princeton!</h1>
        <p className="lead">Sign in to continue</p>
      </header>
      <main className="d-flex flex-column align-items-center justify-content-center text-center">
        {error && <p className="text-danger">{error}</p>}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div
            id="signUpDiv"
            className="p-5 bg-white border rounded"
          ></div>
        )}
      </main>
      <footer className="text-center mt-4">
        <p className="text-muted">
          &copy; {new Date().getFullYear()} Club Princeton
        </p>
      </footer>
    </div>
  );
};

export default Login;
