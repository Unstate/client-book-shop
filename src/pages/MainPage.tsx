import Books from '../components/Books'
import Filter from '../components/Filter'
import classes from '../styles/MainPage.module.css'

const MainPage = () => {
    return (
        <div className={classes.siteContainer}>
            <Filter></Filter>
            <Books></Books>
        </div>
    )
}

export default MainPage