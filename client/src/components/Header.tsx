import classes from './../styles/Header.module.css'
import { Link } from 'react-router-dom'
import LogoNameCompany from './LogoNameCompany'
import userImage from '../assets/user.svg'
import search from '../assets/searchButton.svg'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect, useState } from 'react'
import HeaderMobile from './HeaderMobile'
import { fetchBooksByText } from '../ReduxToolkit/actionCreators'

const Header = () => {

    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(fetchBooksByText(value))
            setValue('')
        }
      };

    // user ? console.log(user) : console.log('No')

    return (
        <>
            <header className={classes.siteHeader}>
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
            <div className={classes.hrContainer}><hr></hr></div>
        </>

    )
}

export default Header