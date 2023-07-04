import Books from '../components/Books'
import Filter from '../components/Filter'
import classes from '../styles/BooksPage.module.css'

const BooksPage = () => {
    return (
        <>
            <div className={classes.siteContainer}>
                <Filter></Filter>
                <Books></Books>
            </div>
        </>
    )

}

export default BooksPage