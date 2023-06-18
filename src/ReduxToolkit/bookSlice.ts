import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Image {
    largeFingernail: string;
    mediumFingernail: string;
    smallFingernail: string;
}

export interface BooksProps {
    _id: string;
    authors: string[];
    genres: string[];
    title: string;
    img: Image;
    description: string;
}

interface BooksState {
    books: BooksProps[];
    isLoading: boolean;
    error: string;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
}

const initialState:BooksState = {
    books: [],
    isLoading: false,
    error: '',
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    page: 1,
}

export const booksSlice = createSlice({
    name: 'books', // уникальное имя слайса
    initialState, // дефолтное состояние 
    reducers: { // редюсеры, типо свитч кэйс
        booksFetching(state) {
            state.isLoading = true;
        },
        booksFetchingSucces(state, action: PayloadAction<BooksProps[]>) {
            state.isLoading = false
            state.error = ''
            state.books = action.payload
        },
        booksFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        totalPagesCount(state, action:PayloadAction<number>) {
            state.totalPages = action.payload
        },
        setHasNextPage(state, action:PayloadAction<boolean>) {
            state.hasNextPage = action.payload
        },
        setHasPrevPage(state, action:PayloadAction<boolean>) {
            state.hasPrevPage = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    }
})

export const {} = booksSlice.actions

export default booksSlice.reducer