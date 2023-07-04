import classes from './../styles/Header.module.css'
import { Link } from 'react-router-dom'
import LogoNameCompany from './LogoNameCompany'
import userImage from '../assets/user.svg'
import search from '../assets/searchButton.svg'
import { useAppSelector } from '../hooks/redux'

const Header = () => {

    const { user } = useAppSelector(state => state.userReducer)

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
            <hr></hr>
        </>

    )
}

export default Header