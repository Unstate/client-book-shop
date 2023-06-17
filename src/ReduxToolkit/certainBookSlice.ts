import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Image } from "./bookSlice";

export interface CertainBook {
    authors: string[];
    bookBinding: string;
    bookSeries: string;
    comments: any[];
    description: string;
    genres: string[];
    img: Image;
    pageCount: number;
    painters: string[];
    publishedDate: string;
    publisher:string;   
    title: string;
    translaters: string[];
    _id: string;
}

interface CertainBookProps {
    book: CertainBook;
    isLoading: boolean;
    error: string;
}

const initialState: CertainBookProps = {
    book: {
        authors: [],
        bookBinding: '',
        bookSeries: '',
        comments: [],
        description: '',
        genres: [],
        img: {
            largeFingernail: '',
            mediumFingernail: '',
            smallFingernail: '',
        },
        pageCount: 0,
        painters: [],
        publishedDate: '',
        publisher: '',
        title: '',
        translaters: [],
        _id: ''
        
        
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
        certainBookFetchingSucces(state,action:PayloadAction<CertainBook>) {
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