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
    pageCount: number;
    publisher: string;
}

export interface BooksState {
    books: BooksProps[];
    isLoading: boolean;
    error: string;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    comments: IComments[];
    lines: boolean
}

export interface IComments {
    bookId: string;
    date: number;
    dislikes: string[];
    likes: string[];
    rating: number;
    text: string;
    title: string;
    userId: string;
    _id: string;
}

const initialState:BooksState = {
    books: [],
    isLoading: false,
    error: '',
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    page: 1,
    comments: [],
    lines: false
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
        },
        setComments(state, action:PayloadAction<IComments[]>) {
            state.comments = action.payload
        },
        filterBooks(state, action:PayloadAction<BooksProps[]>) {
            state.books = action.payload
        },
        setLines(state, action:PayloadAction<boolean>) {
            state.lines = action.payload
        }
    }
})

export const {} = booksSlice.actions

export default booksSlice.reducer