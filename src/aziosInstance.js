// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1212', // Base URL for the API
});

// Set the token for every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Fetch token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set token in headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
