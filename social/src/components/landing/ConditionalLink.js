import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ConditionalLink(props) {
    console.log(props.submitSuccess)
    if (props.submitSuccess) return (
    <nav>
    <Link to="/home">
        <button
          type="submit"
          className="mb-2 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
        >
          Login
        </button>
    </Link>
    </nav>
    );
    return alert("test");
}

export default ConditionalLink;