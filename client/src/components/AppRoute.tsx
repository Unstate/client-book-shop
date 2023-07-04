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

const AppRoute = () => {

    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    },[])

    return (
        <>
            <div className={classes.appWrapper}>
            {isAuth ? <div>АВТОРИЗОВАН</div> : <div> НЕЕЕЕ АВТОРИЗОВАН</div>}
                <Routes>
                    <Route path='/booksPage' element={<BooksPage></BooksPage>}></Route>
                    <Route path='/books/:id' element={<CertainBookPage></CertainBookPage>}></Route>
                    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                    <Route path='/registration' element={<RegistrationPage></RegistrationPage>}></Route>
                    <Route path='/users/:id' element={<UserPage></UserPage>}></Route>
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </div>
        </>
    )
}

export default AppRoute