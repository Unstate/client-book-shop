import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../components/models/IUser";
import { BooksProps, BooksState, IComments } from "./bookSlice";

interface IUsers {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    favouriteBooks: IFavoritebooks;
    comments: IComments[];
    error: string;
    
}

export interface IFavoritebooks {
    books: BooksProps[],
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    page: number,
}

const initialState: IUsers = {
    user: {
        id: '',
        email: '',
        username: '',
        password: '',
        isActivated: false,
        activationLink: '',
        logo: '',
    },
    isAuth: false,
    isLoading: false,
    favouriteBooks: {
        books: [],
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        page: 1,
    },
    comments: [],
    error: ''   
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSucces(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
            // state.user = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setFavouriteBooks(state, action: PayloadAction<BooksState>) {
            state.favouriteBooks = action.payload
        },
        setUserComments(state, action:PayloadAction<IComments[]>) {
            state.comments = action.payload
        },
        setError(state, action:PayloadAction<string>) {
            state.error = action.payload
        },
        deleteFavouriteBook(state, action: PayloadAction<string>) {
            state.favouriteBooks.books = state.favouriteBooks.books.filter(book => book._id !== action.payload)
        },
        setOneFavouriteBook(state, action:PayloadAction<BooksProps>) {
            state.favouriteBooks.books = [...state.favouriteBooks.books, action.payload]
        },
    }
})

export const { } = userSlice.actions

export default userSlice.reducer