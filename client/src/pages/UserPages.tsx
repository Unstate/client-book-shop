import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { getFavouriteBooks, getUserId } from '../ReduxToolkit/actionCreators'
import Preloader from '../components/Preloader'
import User from '../components/User'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { user, isLoading, favouriteBooks } = useAppSelector(state => state.userReducer)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getUserId(id))
            if (user) {
                dispatch(getFavouriteBooks(id))
            }
        }
    }, [])

    return (
        <>  
            {isLoading
                ? <Preloader/>
                : <>
                    <Header/>
                    <User
                    isActivated={user.isActivated}
                    id={user.id}
                    email={user.email}
                    username={user.username}
                    logo={user.logo}
                    activationLink={user.activationLink}
                    password={user.password}
                    favouriteBooks={favouriteBooks}/>
                    <Footer/>
                </>
            }
        </>
    )
}

export default CertainBookPage