import { useState } from 'react'
import Books from '../components/Books'
import Filter from '../components/Filter'
import ModalFilter from '../components/UI/modal/ModalFilter/ModalFilter'
import classes from '../styles/BooksPage.module.css'
import { useAppSelector } from '../hooks/redux'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BooksPage = () => {

    const [visable, setVisable] = useState<boolean>(false)
    const { lines, isLoading } = useAppSelector(state => state.booksReducer)

    return (
        <>  
            <Header/>
            <div className={classes.siteContainer}>
                <Filter/>
                <ModalFilter
                visable={visable}
                setVisable={setVisable}/>
                <Books lines={lines}></Books>
            </div>
            <Footer/>
        </>
    )

}

export default BooksPage