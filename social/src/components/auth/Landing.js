import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Welcome to ClubPrinceton</h1>
      </header>
      <main style={styles.main}>
        <Link
          to="/signup"
          style={styles.button}
        >
          Sign Up/Log In
        </Link>
      </main>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#FFF8E5",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem"
  },
  heading: {
    fontSize: "3rem",
    color: "#333",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    display: "inline-block",
    textDecoration: "none",
    border: "none",
    padding: "1.5rem 3rem",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "1.5rem",
    borderRadius: "50px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)"
  }
};
