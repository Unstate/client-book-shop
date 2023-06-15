import { Route, Routes } from "react-router-dom"
import Header from "./Header"
import MainPage from "../pages/MainPage"
import CertainBookPage from "../pages/CertainBookPage"
import classes from '../styles/AppRoute.module.css'
import Footer from "./Footer"

const AppRoute = () => {
    return (
        <>
            <div className={classes.appWrapper}>
                <Header></Header>
                <Routes>
                    <Route path='/mainPage' element={<MainPage></MainPage>}></Route>
                    <Route path='/books/:id' element={<CertainBookPage></CertainBookPage>}></Route>
                </Routes>
                <Footer></Footer>
            </div>
        </>
    )
}

export default AppRoute