import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')?.replaceAll(/['"]+/g, '');

// If Access token is about to expire ( < 1 min ) get a new access token. send email in body



let api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
        'Authorization': `Bearer ${jwt}`
    }
});

export default api;