import axios from "axios";

let jwt = localStorage.getItem('jwt')?.replaceAll(/['"]+/g, '');
console.log(jwt)
let api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
        'Authorization': `Bearer ${jwt}`
    }
});

export default api;