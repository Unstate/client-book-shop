import classes from './../styles/Header.module.css'
import { Link } from 'react-router-dom'
import LogoNameCompany from './LogoNameCompany'
import user from '../assets/user.svg'
import search from '../assets/searchButton.svg'

const Header = () => {
    return (
        <div className='px-[42px]'>
            <header className={classes.siteHeader}>
                <Link to="/mainPage">
                    <LogoNameCompany></LogoNameCompany>
                </Link>
                <div className={classes.serchAndUserLogoContainer}>
                    <div className={classes.searchContainer}>
                        <img className={classes.searchButton} src={search}></img>
                        <input className={classes.search} placeholder='Название книги'></input>
                    </div>
                    <div className={classes.userImageContainer}>
                        <img src={user}></img>
                    </div>
                </div>
            </header>
            <hr></hr>
        </div>

    )
}

export default Header