import axios from "axios";

const api = axios.create({
    baseURL: "https://twitter-clone-api-ebac.fly.dev/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
