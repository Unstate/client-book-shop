import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./Header"
import MainPage from "../pages/MainPage"
import CertainBookPage from "../pages/CertainBookPage"
import classes from '../styles/AppRoute.module.css'
import Footer from "./Footer"
import LoginPage from "../pages/LoginPage"

const AppRoute = () => {
    return (
        <>
            <div className={classes.appWrapper}>
                <Header></Header>
                <Routes>
                    <Route path='/mainPage' element={<MainPage></MainPage>}></Route>
                    <Route path='/books/:id' element={<CertainBookPage></CertainBookPage>}></Route>
                    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                    <Route path='/*' element={<Navigate to='/mainPage' replace/>}/>
                </Routes>
                <Footer></Footer>
            </div>
        </>
    )
}

export default AppRoute