import axios from 'axios';
import { AppDispatch } from './store';
import { booksSlice } from './bookSlice';
import { CertainBook, certainBookSlice } from './certainBookSlice';


export const fetchBooks = (limit=30, page=1) => async (dispatch: AppDispatch) => {
    try {
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get('http://localhost:3000/api/books',{
            params: {
                limit: limit,
                page: page,
            }})
        console.log(response.data)
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