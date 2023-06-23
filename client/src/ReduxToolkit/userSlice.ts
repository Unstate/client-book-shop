import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../components/models/IUser";

interface IUsers {
    user: IUser;
    isAuth: boolean;
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
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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