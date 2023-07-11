import { Link } from 'react-router-dom'
import classes from './../styles/HeaderMobile.module.css'
import LogoNameCompany from './LogoNameCompany'
import userImage from './../assets/user.svg'
import search from './../assets/searchButton.svg'

interface HeaderMobileProps {
    value: string;
    setValue: Function;
    userId: string;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
    value,
    setValue,
    userId
}) => {
    return (
        <header className={classes.siteHeaderMobile}>
            <div className={classes.upperContainer}>
                <Link to="/booksPage">
                    <LogoNameCompany></LogoNameCompany>
                </Link>
                <div className={classes.userImageContainer}>
                    <Link
                        to={`/users/${userId}`}>
                        <img src={userImage} />
                    </Link>
                </div>
            </div>
            <div className={classes.searchContainer}>
                <input
                    className={classes.search}
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    placeholder='Название книги' />
                <img
                    className={classes.searchButton}
                    src={search} />
            </div>
        </header>
    )
}

export default HeaderMobile