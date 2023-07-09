import classes from './../styles/Header.module.css'
import { Link } from 'react-router-dom'
import LogoNameCompany from './LogoNameCompany'
import userImage from '../assets/user.svg'
import search from '../assets/searchButton.svg'
import { useAppSelector } from '../hooks/redux'
import { useEffect, useState } from 'react'

const Header = () => {

    const { user, isAuth } = useAppSelector(state => state.userReducer)
    const [value, setValue] = useState<string>('')
    const [visable, setVisable] = useState<boolean>(false)
    // console.log(user, isAuth)

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
                            src={search} />
                        <input
                            className={classes.search}
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            placeholder='Название книги' />
                        {visable
                            ? <div className={classes.searchResultContainer}>
                                
                            </div>
                            : <></>}
                    </div>
                    <div className={classes.userImageContainer}>
                        <Link
                            to={`/users/${user.id}`}>
                            <img src={userImage} />
                        </Link>
                    </div>
                </div>
            </header>
            <hr></hr>
        </>

    )
}

export default Header