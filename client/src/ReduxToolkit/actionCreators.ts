import axios from 'axios';
import { AppDispatch } from './store';
import { IComments, booksSlice } from './bookSlice';
import { CertainBook, certainBookSlice } from './certainBookSlice';
import { userSlice } from './userSlice';
import AuthService from '../components/services/AuthService';
import { IUser } from '../components/models/IUser';
import { AuthResponse } from '../components/models/response/AuthResponse';
// import { $api_TEST, $api_TEST_SECOND } from '../components/http';


export const fetchBooks = (limit = 30, page = 1) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
        }
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get(`http://localhost:3000/api/books`, { params })
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
        dispatch(booksSlice.actions.totalPagesCount(response.data.totalPages))
        dispatch(booksSlice.actions.setHasNextPage(response.data.hasNextPage))
        dispatch(booksSlice.actions.setHasPrevPage(response.data.hasPrevPage))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.message))
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
        dispatch(booksSlice.actions.booksFetchingError(error.message))
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
        console.log(response.data)
        dispatch(booksSlice.actions.setComments(response.data))
    } catch (error: any) {
    }
}

export const fetchBooksByText = (text:string) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            text,
        }
        console.log(text)
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get(`http://localhost:3000/api/books?text=${text}`, { params })
        console.log(response)
        dispatch(booksSlice.actions.booksFetchingSucces(response.data.books))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
}

export const setNewBookComment = (id: string, title: string, text: string, rating: number) => {
    console.log(`
                    TITLE >>> ${title}
                    TEXT >>> ${text}
                    RATING >>> ${rating}            
    `)

    return axios.post(`http://localhost:3000/api/books/${id}/comments`,{title:title,text:text,rating:rating})
    // return axios.post(`http://localhost:3000/api/books/${id}/comments`, {
    //     withCredentials:true,
    //     title,
    //     text,
    //     rating,
    // })
    
}

export const getUserId = (id: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await axios.get<IUser>(`http://localhost:3000/api/users/${id}`)
        console.log(response.headers)
        dispatch(userSlice.actions.userFetchingSucces(false))
        dispatch(userSlice.actions.setUser(response.data))
    } catch (error: any) {
        dispatch(userSlice.actions.userFetchingSucces(false))
        console.log(error.response?.data?.message)
    }
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    console.log(`FUNCION LOGIN IS WORKING NOW`)
    try {
        const response = await AuthService.login(email, password)
        console.log(`LOGINRESPONSE >> ${response.data}`)
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
        console.log(`REGISTRATIONRESPONSE >> ${response.data}`)
        localStorage.setItem('token', response.data.accessToken)
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
        const response = await axios.get<AuthResponse>(`http://localhost:3000/api/auth/refresh`, {
            withCredentials: true,
        })
        console.log(`CheckAuthResponse >>> ${response}`)
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
    console.log('TRY')
    return await axios.post(`http://localhost:3000/api/users/${id}/favoritebooks`, { bookId })
}

export const changeUserEmail = async (id:string, email:string) => {
    return await axios.put(`http://localhost:3000/api/users/${id}/email`,{email})
}




