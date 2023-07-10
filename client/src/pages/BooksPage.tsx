import { useState } from 'react'
import Books from '../components/Books'
import Filter from '../components/Filter'
import ModalFilter from '../components/UI/modal/ModalFilter/ModalFilter'
import classes from '../styles/BooksPage.module.css'

const BooksPage = () => {

    const [visable, setVisable] = useState<boolean>(false)

    return (
        <>
            <div className={classes.siteContainer}>
                <Filter></Filter>
                <ModalFilter
                visable={visable}
                setVisable={setVisable}></ModalFilter>
                <Books></Books>
            </div>
        </>
    )

}

export default BooksPage