import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../components/models/IUser";

interface IUsers {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean
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
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSucces(state,action:PayloadAction<boolean>) {
            state.isLoading = action.payload
            // state.user = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
    }
})

export const { } = userSlice.actions

export default userSlice.reducer