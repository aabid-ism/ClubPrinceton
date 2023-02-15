import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.endsWith("@princeton.edu")) {
      alert(`Welcome, ${email}!`);
    } else {
      alert("Sorry, you need a valid princeton.edu email address to sign up.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src={logo}
        alt="React logo"
        className="mb-10 w-48 h-48 rounded-full"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white p-8 rounded-md shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-8 text-black">Login</h2>
        <label className="text-base mb-4 text-black">
          Please enter your email address:
        </label>
        <input
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="w-64 p-2 rounded-md border border-gray-400 mb-8 bg-white text-black"
        />
        <button
          type="submit"
          className="mb-2 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
        >
          Login
        </button>
        Don't have an account? <a href="#">Sign Up!</a>
      </form>
      <div className="text-base mt-8 text-gray-500 flex flex-col items-center justify-center">
        <p>CAS Authentication Required.  </p>
        
      </div>
    </div>
  );
}

export default Landing;
