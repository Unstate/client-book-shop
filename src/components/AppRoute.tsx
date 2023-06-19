import { Navigate, Route, Routes } from "react-router-dom"
import CertainBookPage from "../pages/CertainBookPage"
import classes from '../styles/AppRoute.module.css'
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"
import BooksPage from "../pages/BooksPage"

const AppRoute = () => {
    return (
        <>
            <div className={classes.appWrapper}>
                <Routes>
                    <Route path='/booksPage' element={<BooksPage></BooksPage>}></Route>
                    <Route path='/books/:id' element={<CertainBookPage></CertainBookPage>}></Route>
                    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                    <Route path='/registration' element={<RegistrationPage></RegistrationPage>}></Route>
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </div>
        </>
    )
}

export default AppRoute