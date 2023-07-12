import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { getUserId } from '../ReduxToolkit/actionCreators'
import Preloader from '../components/Preloader'
import User from '../components/User'

const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { user, isLoading } = useAppSelector(state => state.userReducer)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUserId(id))
    }, [])

    console.log(user)
    console.log(`ISLOADING >>> ${isLoading}`)

    return (
        <>
            {isLoading
                ? <Preloader/>
                : <User
                    isActivated={user.isActivated}
                    id={user.id}
                    email={user.email}
                    username={user.username}
                    logo={user.logo}
                    activationLink={user.activationLink}
                    password={user.password}/>
            }
        </>
    )
}

export default CertainBookPage