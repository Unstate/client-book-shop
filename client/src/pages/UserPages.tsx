import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { getFavouriteBooks, getUserComments, getUserId, getUserImage } from '../ReduxToolkit/actionCreators'
import Preloader from '../components/Preloader'
import User from '../components/User'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import ModalError from '../components/UI/modal/modalError/ModalError'

const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { user, isLoading, favouriteBooks, comments, error } = useAppSelector(state => state.userReducer)
    const { id } = useParams()

    // const [errorMessage, setErrorMessage] = useState<string | null>(error);

    // // console.log(errorMessage)

    // const handleError = (message: string) => {
    //     setErrorMessage(message);
    // };

    // const handleCloseError = () => {
    //     setErrorMessage(null);
    // };

    // console.log(user)

    useEffect(() => {
        if (id) {
            dispatch(getUserId(id))
            dispatch(getFavouriteBooks(id))
            dispatch(getUserComments(id))
            dispatch(getUserImage(id))
        }
        // if (id) {
        //     dispatch(getUserId(id))
        //     if (user) {
        //         dispatch(getFavouriteBooks(id))
        //         dispatch(getUserComments(id))
        //         dispatch(getUserImage(id))
        //     }
        // } else {
        //     console.log(`ID PROPAL NAHUI`)
        // }
    }, [])

    // useEffect(() => {
    //     if (error) {
    //         handleError(error)
    //     }
    // }, [error])

    // useEffect(()=>{console.log(error)},[error])

    return (
        <>
            {isLoading
                ? <Preloader />
                : <main>
                    {/* <Header/> */}
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
                        error={error} />
                    {/* <Footer/> */}
                </main>
            }
            {/* {errorMessage && (
                    <ModalError message={errorMessage} onClose={handleCloseError} />
                )} */}
        </>
    )
}

export default CertainBookPage