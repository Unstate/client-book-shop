import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BooksProps } from "./bookSlice";

interface CertainBookProps {
    book: BooksProps;
    isLoading: boolean;
    error: string;
}

const initialState: CertainBookProps = {
    book: {
        id: '',
        authors: [],
        genre: [],
        title: '',
        img: {
            smallThumbnail: '',
            thumbnail: '',
        },
        description: '',
    },
    isLoading: false,
    error: '',
}

export const certainBookSlice = createSlice({
    name: 'certainBook',
    initialState,
    reducers: {
        certainBookFetching(state) {
            state.isLoading = true
        },
        certainBookFetchingSucces(state,action:PayloadAction<BooksProps>) {
            state.isLoading = false
            state.error = ''
            state.book = action.payload
        },
        certainBookFetchingError(state,action:PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { } = certainBookSlice.actions

export default certainBookSlice.reducer