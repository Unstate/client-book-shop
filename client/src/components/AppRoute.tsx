import { Navigate, Route, Routes } from "react-router-dom"
import CertainBookPage from "../pages/CertainBookPage"
import classes from '../styles/AppRoute.module.css'
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"
import BooksPage from "../pages/BooksPage"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import { checkAuth } from "../ReduxToolkit/actionCreators"
import UserPage from "../pages/UserPages"
import Header from "./Header"
import Footer from "./Footer"

const AppRoute = () => {

    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    return (
        <>
            <div className={classes.appWrapper}>
                <Header></Header>
                {isAuth ? <p>АВТОРИЗОВАН</p> : <p> НЕЕЕЕ АВТОРИЗОВАН</p>}
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
                        path='/login'
                        element={<LoginPage />}>
                    </Route>

                    <Route
                        path='/registration'
                        element={<RegistrationPage />}>
                    </Route>

                    <Route
                        path='/users/:id'
                        element={<UserPage />}>
                    </Route>

                    <Route
                        path='/*'
                        element={<Navigate to='/login' replace />}>
                    </Route>
                    
                </Routes>
                <Footer />
            </div>
        </>
    )
}

export default AppRoute