import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { getFavouriteBooks, getUserComments, getUserId } from '../ReduxToolkit/actionCreators'
import Preloader from '../components/Preloader'
import User from '../components/User'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { user, isLoading, favouriteBooks, comments, error } = useAppSelector(state => state.userReducer)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getUserId(id))
            if (user) {
                dispatch(getFavouriteBooks(id, 4, 1))
                dispatch(getUserComments(id))
            }
        }
    }, [])

    return (
        <>  
            {isLoading
                ? <Preloader/>
                : <main>
                    <Header/>
                    <User
                    isActivated={user.isActivated}
                    id={user.id}
                    email={user.email}
                    username={user.username}
                    logo={user.logo}
                    activationLink={user.activationLink}
                    password={user.password}
                    favouriteBooks={favouriteBooks}
                    comments={comments}
                    error={error}/>
                    <Footer/>
                </main>
            }
        </>
    )
}

export default CertainBookPage