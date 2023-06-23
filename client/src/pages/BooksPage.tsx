import Books from '../components/Books'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Header from '../components/Header'
import classes from '../styles/BooksPage.module.css'

const BooksPage = () => {
    return (
        <>
            <Header></Header>
            <div className={classes.siteContainer}>
                <Filter></Filter>
                <Books></Books>
            </div>
            <Footer></Footer>
        </>
    )

}

export default BooksPage