import axios from 'axios';
import { AppDispatch } from './store';
import { IComments, booksSlice } from './bookSlice';
import { CertainBook, certainBookSlice } from './certainBookSlice';
import { userSlice } from './userSlice';
import AuthService from '../components/services/AuthService';
import { IUser } from '../components/models/IUser';
import { AuthResponse } from '../components/models/response/AuthResponse';


export const fetchBooks = (limit=30, page=1) => async (dispatch: AppDispatch) => {
    try {
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get('http://localhost:3000/api/books',{
            params: {
                limit: limit,
                page: page,
            }})
        // console.log(response.data)
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
        dispatch(booksSlice.actions.totalPagesCount(response.data.totalPages))
        dispatch(booksSlice.actions.setHasNextPage(response.data.hasNextPage))
        dispatch(booksSlice.actions.setHasPrevPage(response.data.hasPrevPage))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
}

export const getBookById = (id:any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(certainBookSlice.actions.certainBookFetching())
        const response = await axios.get<CertainBook>(`/api/books/${id}`)
        dispatch(certainBookSlice.actions.certainBookFetchingSucces(response.data))
    } catch (error: any) {
        dispatch(certainBookSlice.actions.certainBookFetchingError(error))
    }
}

export const getBookByIdComments = (id:any) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IComments>(`/api/books/${id}/comments`)
        // console.log(response.data)
        dispatch(booksSlice.actions.setComments(response.data))
    } catch (error: any) {
        // dispatch(certainBookSlice.actions.certainBookFetchingError(error))
    }
}

export const getUserId = (id:any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await axios.get<IUser>(`/api/users/${id}`)
        dispatch(userSlice.actions.userFetchingSucces(response.data))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const login = (email:string, password:string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password)
        // console.log(response)
        localStorage.setItem('token',response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const registration = (email:string,username:string,password:string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email,username,password)
        // console.log(response)
        localStorage.setItem('token',response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data)
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(userSlice.actions.setAuth(false))
        dispatch(userSlice.actions.setUser({} as IUser))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<AuthResponse>(`http://localhost:3000/api/auth/refresh`,{
            withCredentials: true,
        })
        // console.log(response)
        localStorage.setItem('token',response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

