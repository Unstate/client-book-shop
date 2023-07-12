import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

const API_URL = `http://localhost:3000/api/auth`
const API_URL_TEST = `http://localhost:3000/api/books`
const API_URL_TEST_SECOND = `http://localhost:3000/api/users`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const $api_TEST = axios.create({
    withCredentials: true,
    baseURL: API_URL_TEST
})

export const $api_TEST_SECOND = axios.create({
    withCredentials: true,
    baseURL: API_URL_TEST_SECOND
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
})

export default $api