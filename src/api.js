import axios from "axios";

const api = axios.create({
    baseURL : "https://project-backendfinal.onrender.com/api"
});

export default api;