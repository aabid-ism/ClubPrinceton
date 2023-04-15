import axios from "axios";

const jwt = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
        'Authorization': `Bearer ${jwt}`
    }
});

export default api;