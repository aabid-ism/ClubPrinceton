import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./tailwind.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminInterface from './components/admin/AdminPage';
import UserAdminPage from './components/user-admin/UserAdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminInterface />} />
        <Route path="user-admin" element={<UserAdminPage />}/>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
