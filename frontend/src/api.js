import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"
import { jwtDecode } from "jwt-decode"


const api = axios.create({baseURL: import.meta.env.VITE_API_URL})
const refreshApi = axios.create({baseURL: import.meta.env.VITE_API_URL})


function isTokenExpired(token) {
    const tokenExpiry = jwtDecode(token).exp;
    const now = Date.now() / 1000;
    return now > tokenExpiry
}

async function refreshToken() {
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    if (!refresh) {return false}

    try {
            console.log("sending refresh token request")
            const res = await refreshApi.post("/api/token/refresh/", {refresh: refresh});

            if (res.status = 200) {
                console.log("access token refreshed")
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                
            } else {return false}

        } catch (error) {
            console.log(error);
            return false
        }
}


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token && (!isTokenExpired(token) || refreshToken())) {
            const token = localStorage.getItem(ACCESS_TOKEN)
            config.headers.Authorization = `Bearer ${token}`
        } 
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api