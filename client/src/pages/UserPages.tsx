import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
// import classes from '../styles/CertainBookPage.module.css'
import { useEffect } from 'react'
import { getBookById, getUserId } from '../ReduxToolkit/actionCreators'
import CertainBook from '../components/CertainBook'
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import User from '../components/User'


const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { user, isLoading } = useAppSelector(state => state.userReducer)
    const { id } = useParams()

    console.log(user)

    useEffect(() => {
        dispatch(getUserId(id))
    }, [])

    return (
        <>
            <Header></Header>
            {isLoading
                ? <Preloader></Preloader>
                : <div>
                    <User
                        isActivated={user.isActivated}
                        id={user.id}
                        email={user.email}
                        username={user.username}
                        logo={user.logo}
                        activationLink={user.activationLink}
                        password={user.password}></User>
                </div>}
                <Footer></Footer>
        </>
    )
}

export default CertainBookPage