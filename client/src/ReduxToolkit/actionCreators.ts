import axios from 'axios';
import { AppDispatch } from './store';
import { BooksProps, BooksState, IComments, booksSlice } from './bookSlice';
import { CertainBook, certainBookSlice } from './certainBookSlice';
import { userSlice } from './userSlice';
import AuthService from '../components/services/AuthService';
import { IUser } from '../components/models/IUser';
import { AuthResponse } from '../components/models/response/AuthResponse';
import $api, { $api_books, $api_users } from '../components/http';


export const fetchBooks = (limit = 30, page = 1) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
        }
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get(`http://localhost:3000/api/books`, { params })
        console.log(response.data.books)
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
        dispatch(booksSlice.actions.totalPagesCount(response.data.totalPages))
        dispatch(booksSlice.actions.setHasNextPage(response.data.hasNextPage))
        dispatch(booksSlice.actions.setHasPrevPage(response.data.hasPrevPage))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.response?.data?.message))
    }
}

export const fetchBooksFilter = (limit = 30, page = 1, genre: string[], author: string[]) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
            genre: genre.join('-'),
            author: author.join('-'),
        }
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get(`http://localhost:3000/api/books`, { params })
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
        dispatch(booksSlice.actions.totalPagesCount(response.data.totalPages))
        dispatch(booksSlice.actions.setHasNextPage(response.data.hasNextPage))
        dispatch(booksSlice.actions.setHasPrevPage(response.data.hasPrevPage))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.response?.data?.message))
    }
}

export const getBookById = (id: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(certainBookSlice.actions.certainBookFetching())
        const response = await axios.get<CertainBook>(`/api/books/${id}`)
        dispatch(certainBookSlice.actions.certainBookFetchingSucces(response.data))
    } catch (error: any) {
        dispatch(certainBookSlice.actions.certainBookFetchingError(error))
    }
}

export const getBookByIdComments = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IComments[]>(`http://localhost:3000/api/books/${id}/comments`)
        dispatch(booksSlice.actions.setComments(response.data))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const fetchBooksByText = (text: string) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            text,
        }
        console.log(text)
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get(`http://localhost:3000/api/books`, { params })
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
        dispatch(booksSlice.actions.totalPagesCount(response.data.totalPages))
        dispatch(booksSlice.actions.setHasNextPage(response.data.hasNextPage))
        dispatch(booksSlice.actions.setHasPrevPage(response.data.hasPrevPage))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.response?.data?.message))
    }
}

export const setNewBookComment = (id: string, title: string, text: string, rating: number) => {
    return $api_books.post(`/${id}/comments`, { title: title, text: text, rating: rating })
}

export const getUserId = (id: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await axios.get<IUser>(`http://localhost:3000/api/users/${id}`)
        dispatch(userSlice.actions.userFetchingSucces(false))
        dispatch(userSlice.actions.setUser(response.data))
    } catch (error: any) {
        dispatch(userSlice.actions.userFetchingSucces(false))
        console.log(error.response?.data?.message)
    }
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const registration = (email: string, username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, username, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data?.message)
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

export const resetPassword = async (email: string) => {
    try {
        const response = await AuthService.resetPassword(email)
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const resetChangePassword = async (token: string, password: string) => {
    try {
        const response = await AuthService.resetChangePassword(token, password)
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<AuthResponse>(`http://localhost:3000/api/auth/refresh`, {
            withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const setBookLocation = (lines: boolean) => (dispatch: AppDispatch) => {
    dispatch(booksSlice.actions.setLines(lines))
}

export const setFavouriteBook = async (id: string, bookId: string) => {
    try {
        return await $api_users.post(`/${id}/favoritebooks`, { bookId })
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const getFavouriteBooks = (id: string, limit = 5, page = 1) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
        }
        const response = await $api_users.get<BooksState>(`/${id}/favoritebooks`, {params})
        dispatch(userSlice.actions.setFavouriteBooks(response.data))
    } catch (e: any) {
        console.log(e.response?.data?.message)
    }
}

export const changeUserEmail = async (id: string, email: string) => {
    try {
        return await $api_users.put(`/${id}/email`, { email })
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
    
}

export const changeUserName = async (id: string, name: string) => { 
    try {
        return await $api_users.put(`/${id}/username`, { name })
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const deleteFavouriteBook = async (id: any, bookId: string) => {    
    try {
        return await $api_users.delete(`/${id}/favoritebooks`, { data: { bookId } })
    } catch (error:any) {
       console.log(error.response?.data?.message)
    }
}

export const checkPassword = async (id: string, password: string) => {
    try {
        return await $api_users.post(`/${id}/checkpassword`, { password })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const setNewPassword = async (id: string, password: string) => {
    try {
        return await $api_users.put(`/${id}/password`, {password})
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const getUserImage = async (id: string) => {
    try {
        const response = await $api_users.get(`/${id}/logo`)
        console.log(response)
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const setNewUserImage = async (id: string, logo: any) =>  {
    try {
        return await $api_users.put(`/${id}/logo`, {logo})
    } catch (error:any) {
        console.log(error.response?.data?.message)
    }
}

export const getUserComments = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api_users.get<IComments[]>(`/${id}/comments`)
        dispatch(userSlice.actions.setUserComments(response.data))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const setLikes = async (id: string) => {
    try {
        return $api_books(`/${id}/comments`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const deleteFavouriteBookFromStore = (id:string) => (dispatch: AppDispatch) => {
    return dispatch(userSlice.actions.deleteFavouriteBook(id))
}

export const setOneFavouriteBook = (book:BooksProps) => (dispatch: AppDispatch) => {
    return dispatch(userSlice.actions.setOneFavouriteBook(book))
}




