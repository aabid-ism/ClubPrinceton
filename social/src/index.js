import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./tailwind.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AdminInterface from "./components/admin/AdminPage";
import SuperAdminInterface from "./components/super_admin/SuperAdminInterface";
import Signup from "./components/auth/Signup";
import Landing from "./components/auth/Landing";
import Image from "./components/image/Image";
import ClubForm from "./components/clubForm/ClubForm";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/image" element={<Image />} />
        <Route path="/clubform" element={<ClubForm />} />
        <Route path="*" element={<App />} />
        <Route path="/superadmin" element={<SuperAdminInterface />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
