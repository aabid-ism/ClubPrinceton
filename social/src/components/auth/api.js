import axios from "axios";

const jwt = localStorage.getItem('jwt')?.replaceAll(/['"]+/g, '');

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
        'Authorization': `Bearer ${jwt}`
    }
});

export default api;