import { BooksState } from "../../ReduxToolkit/bookSlice";
import { IFavoritebooks } from "../../ReduxToolkit/userSlice";

export interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    logo: string;
}