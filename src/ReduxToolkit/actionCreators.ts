import axios from 'axios';
import { AppDispatch } from './store';
import { BooksProps, booksSlice } from './bookSlice';
import { certainBookSlice } from './certainBookSlice';



export const fetchBooks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get<BooksProps[]>('/api/books?limit=10&page=1')
        console.log(response)
        dispatch(booksSlice.actions.booksFetchingSucces(response.data))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
}

export const getBookById = (id:any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(certainBookSlice.actions.certainBookFetching())
        const response = await axios.get<BooksProps>(`/api/books/${id}`)
        dispatch(certainBookSlice.actions.certainBookFetchingSucces(response.data))
    } catch (error: any) {
        dispatch(certainBookSlice.actions.certainBookFetchingError(error))
    }
}