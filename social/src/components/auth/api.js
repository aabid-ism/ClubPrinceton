import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')?.replaceAll(/['"]+/g, '')}`
    }
});

// Add a request interceptor to update headers before each request
api.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')?.replaceAll(/['"]+/g, '')}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    response => response,
    error => {
        // If the error is a 401 Unauthorized error, redirect the user to the login page
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Interceptor caught a 401 or 403 forbidden request!");
            window.location.href = '/signup';
        }
        return Promise.reject(error);
    }
);

export default api;
