import { useState } from 'react'
import Books from '../components/Books'
import Filter from '../components/Filter'
import ModalFilter from '../components/UI/modal/ModalFilter/ModalFilter'
import classes from '../styles/BooksPage.module.css'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setBookLocation } from '../ReduxToolkit/actionCreators'

const BooksPage = () => {

    const [visable, setVisable] = useState<boolean>(false)
    const { lines } = useAppSelector(state => state.booksReducer)

    return (
        <>
            <div className={classes.siteContainer}>
                <Filter/>
                <ModalFilter
                visable={visable}
                setVisable={setVisable}/>
                <Books lines={lines}></Books>
            </div>
        </>
    )

}

export default BooksPage