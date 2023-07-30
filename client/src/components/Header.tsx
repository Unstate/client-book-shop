import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import classes from './../styles/Header.module.css'
import { fetchBooksByText } from '../ReduxToolkit/actionCreators'
import { Link } from 'react-router-dom'
import LogoNameCompany from './LogoNameCompany'
import search from './../assets/searchButton.svg'
import userImage from './../assets/user.svg'
import HeaderMobile from './HeaderMobile'

const Header = () => {
    
    // getting user data from store
    const { user } = useAppSelector(state => state.userReducer) 
    const dispatch = useAppDispatch() 
    const [value, setValue] = useState<string>('')

    //Function that allow start search by press on the ENTER button
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(fetchBooksByText(value))
            setValue('')
        }
    };

    // useEffect(() => {
    //     console.log(user)
    // },[user])

    return (
        <>
            <header className={classes.siteHeader} id='header1'>
                <Link to="/booksPage">
                    <LogoNameCompany></LogoNameCompany>
                </Link>
                <div className={classes.serchAndUserLogoContainer}>
                    <div className={classes.searchContainer}>
                        <img
                            className={classes.searchButton}
                            src={search}
                            onClick={() => {
                                dispatch(fetchBooksByText(value))
                                setValue('')
                            }}/>
                        <input
                            onKeyDown={handleKeyPress}
                            className={classes.search}
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            placeholder='Название книги' />
                    </div>
                    <div className={classes.userImageContainer}>
                        <Link
                            to={`/users/${user.id}`}>
                            <img src={userImage} />
                        </Link>
                    </div>
                </div>
            </header>
            <HeaderMobile
            value={value}
            setValue={setValue}
            userId={user.id}></HeaderMobile>
            <div className={classes.hrContainer}>
                <hr/>
            </div>
        </>

    )
}

export default Header