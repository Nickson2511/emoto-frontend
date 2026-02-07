import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // OK to keep if you also use cookies elsewhere
});

/* ================= AUTH INTERCEPTOR ================= */
api.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("auth"); 
        

        if (auth) {
            const { accessToken } = JSON.parse(auth);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }


        return config;
    },
    (error) => Promise.reject(error)
);

export default api;



