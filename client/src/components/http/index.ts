import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

const API_URL_AUTH = `http://localhost:3000/api/auth`
const API_URL_BOOKS = `http://localhost:3000/api/books`
const API_URL_USERS = `http://localhost:3000/api/users`
const API_URL_COMMENTS = `http://localhost:3000/api/comments`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL_AUTH
})

export const $api_books = axios.create({
    withCredentials: true,
    baseURL: API_URL_BOOKS
}) 

export const $api_users = axios.create({
    withCredentials: true,
    baseURL: API_URL_USERS
})

export const $api_comments = axios.create({
    withCredentials: true,
    baseURL: API_URL_COMMENTS
})


$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL_AUTH}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
})

$api_books.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api_users.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api_comments.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}

export default $api