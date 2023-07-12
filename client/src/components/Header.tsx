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

    const { user, isAuth } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const [visable, setVisable] = useState<boolean>(false)
    user && isAuth ? console.log(user, isAuth) : ''

    useEffect(() => {
        if (value != '') {
            setVisable(true)
        } else {
            setVisable(false)
        }
    }, [value])

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
                            onClick={() => dispatch(fetchBooksByText(value))}/>
                        <input
                            className={classes.search}
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            placeholder='Название книги' />
                        {/* {visable
                            ? <div className={classes.searchResultContainer}>

                            </div>
                            : <></>} */}
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