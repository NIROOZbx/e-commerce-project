

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create a custom axios instance
export const api = axios.create({
    baseURL:BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


api.interceptors.response.use((response) => {
    return response
},
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                console.log("Issuing new access token");
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},

                    {withCredentials:true}
                    
                );

                const newAccessToken = response.data.accessToken;

                 console.log("New access token granted");


                sessionStorage.setItem('accessToken', newAccessToken);


                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;


                return api(originalRequest);

            } catch (refreshError) {

                console.error("Session expired. Logging out...");
                sessionStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);



export const jsonApi = axios.create({
    baseURL: 'http://localhost:3000', // Standard json-server port
    headers: { 'Content-Type': 'application/json' }
});