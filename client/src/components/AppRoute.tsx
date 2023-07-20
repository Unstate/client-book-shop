import { Navigate, Route, Routes } from "react-router-dom"
import CertainBookPage from "../pages/CertainBookPage"
import classes from '../styles/AppRoute.module.css'
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"
import BooksPage from "../pages/BooksPage"
import { useAppDispatch } from "../hooks/redux"
import { useEffect } from "react"
import { checkAuth } from "../ReduxToolkit/actionCreators"
import UserPage from "../pages/UserPages"
import ScrollButton from "./ScrollButton"

const AppRoute = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    return (
        <>
            <div className={classes.appWrapper}>
                <Routes>

                    <Route
                        path='/booksPage'
                        element={<BooksPage />}>
                    </Route>

                    <Route
                        path='/books/:id'
                        element={<CertainBookPage />}>
                    </Route>

                    <Route
                        path='/users/:id'
                        element={<UserPage />}>
                    </Route>

                    <Route
                        path='/login'
                        element={<LoginPage />}>
                    </Route>

                    <Route
                        path='/registration'
                        element={<RegistrationPage />}>
                    </Route>

                    <Route
                        path='/*'
                        element={<Navigate to='/login' replace />}>
                    </Route>

                </Routes>
                <ScrollButton></ScrollButton>
            </div>
        </>
    )
}

export default AppRoute