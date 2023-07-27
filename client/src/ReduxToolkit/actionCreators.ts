import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from './store';
import { BooksProps, BooksState, IComments, booksSlice } from './bookSlice';
import { CertainBook, certainBookSlice } from './certainBookSlice';
import { userSlice } from './userSlice';
import AuthService from '../components/services/AuthService';
import { IUser } from '../components/models/IUser';
import { AuthResponse } from '../components/models/response/AuthResponse';
import { $api_books, $api_comments, $api_users } from '../components/http';



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
        dispatch(booksSlice.actions.booksFetchingError(error.response?.data?.message))
    }
}

export const fetchBooksFilter = (limit = 30, page = 1, genre?: string[], author?: string[]) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
            genre: genre?.join('-'),
            author: author?.join('-'),
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
        const response = await $api_books.get<IComments[]>(`/${id}/comments`)
        dispatch(booksSlice.actions.setComments(response.data))
    } catch (error: any) {
    }
}

export const fetchBooksByText = (text: string) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            text,
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

export const setNewBookComment = (id: string, title: string, text: string, rating: number) => {
    return $api_books.post(`/${id}/comments`, { title: title, text: text, rating: rating })
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const getUserId = (id: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await $api_users.get<IUser>(`/${id}`)
        dispatch(userSlice.actions.userFetchingSucces(false))
        dispatch(userSlice.actions.setUser(response.data))
    } catch (error: any) {
        dispatch(userSlice.actions.userFetchingSucces(false))
        dispatch(userSlice.actions.setError(error.response?.data?.message))
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
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
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
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


//FIXME: если будет какая-то ошибка, то убрать return на const response, и поставить в начало 
//сразу после try
export const logout = () => async (dispatch: AppDispatch) => {
    try {
        localStorage.removeItem('token')
        dispatch(userSlice.actions.setAuth(false))
        dispatch(userSlice.actions.setUser({} as IUser))
        return await AuthService.logout()
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const resetPassword = async (email: string) => {
    try {
        return await AuthService.resetPassword(email)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

//FIXME: если не работает, убрать return на const response 
export const resetChangePassword = async (token: string, password: string) => {
    try {
        return await AuthService.resetChangePassword(token, password)
    } catch (error: any) {
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
//FIXME: Убрать отсюда функцию, хз куда правда
export const setBookLocation = (lines: boolean) => (dispatch: AppDispatch) => {
    dispatch(booksSlice.actions.setLines(lines))
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const setFavouriteBook = async (id: string, bookId: string) => {
    try {
        return await $api_users.post(`/${id}/favoritebooks`, { bookId })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const getFavouriteBooks = (id: string, limit = 5, page = 1) => async (dispatch: AppDispatch) => {
    try {
        const params = {
            limit: limit,
            page: page,
        }
        const response = await $api_users.get<BooksState>(`/${id}/favoritebooks`, { params })
        dispatch(userSlice.actions.setFavouriteBooks(response.data))
    } catch (e: any) {
        console.log(e.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const changeUserEmail = (id: string, email: string) => async (dispatch: AppDispatch) => {
    try {
        return await $api_users.put(`/${id}/email`, { email })
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.response?.data?.message))
    }

}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const changeUserName = async (id: string, username: string) => {
    try {
        return await $api_users.put(`/${id}/username`, { username })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const deleteFavouriteBook = async (id: any, bookId: string) => {
    try {
        return await $api_users.delete(`/${id}/favoritebooks`, { data: { bookId } })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const checkPassword = async (id: string, password: string) => {
    try {
        return await $api_users.post(`/${id}/checkpassword`, { password })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}
//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const setNewPassword = async (id: string, password: string) => {
    try {
        return await $api_users.put(`/${id}/password`, { password })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

//FIXME: Переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const getUserImage = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await $api_users.get(`/${id}/logo`, { responseType: 'blob' })
            .then((response: AxiosResponse<Blob>) => {
                const imageBlob = response.data;
                const imageUrl = URL.createObjectURL(imageBlob);
                const imgEl = new Image();
                imgEl.src = imageUrl;
                dispatch(userSlice.actions.setUserImage(imgEl.src))
            })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}


//FIXME: переделеать под dispatch, чтобы можно было выводить сообщение об ошибке
export const setNewUserImage = async (id: string, logoList: FileList) => {
    const logo = logoList[0]
    console.log(id)
    try {
        return await $api_users.put(`/${id}/logo`, { logo }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

//FIXME: переделать под dispatch, чтобы можно было выводить сообщение об ошибке
export const deleteUserImage = async (id: string) => {
    try {
        return await $api_users.delete(`/${id}/logo`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

//FIXME: переделать под dispatch, чтобы можно было выводить сообщение
export const getUserComments = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api_users.get<IComments[]>(`/${id}/comments`)
        dispatch(userSlice.actions.setUserComments(response.data))
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}


//FIXME: переделать под dispatch, чтобы можно было вовыдить сообщения
export const addLike = async (id: string) => {
    try {
        return $api_comments.post(`/${id}/likes`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const deleteLike = async (id: string) => {
    try {
        return $api_comments.delete(`/${id}/likes`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const addDislike = async (id: string) => {
    try {
        return $api_comments.post(`/${id}/dislikes`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

export const deleteDislike = async (id: string) => {
    try {
        return $api_comments.delete(`/${id}/dislikes`)
    } catch (error: any) {
        console.log(error.response?.data?.message)
    }
}

//FIXME: переместить эти функции в другое место, хотя хз
export const deleteFavouriteBookFromStore = (id: string) => (dispatch: AppDispatch) => {
    return dispatch(userSlice.actions.deleteFavouriteBook(id))
}

export const setOneFavouriteBook = (book: BooksProps) => (dispatch: AppDispatch) => {
    return dispatch(userSlice.actions.setOneFavouriteBook(book))
}





