import { useEffect, useState } from 'react'
import Books from '../components/Books'
import Filter from '../components/Filter'
import ModalFilter from '../components/UI/modal/ModalFilter/ModalFilter'
import classes from '../styles/BooksPage.module.css'
import { useAppSelector } from '../hooks/redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalError from '../components/UI/modal/modalError/ModalError'

const BooksPage = () => {

    const [visable, setVisable] = useState<boolean>(false)
    const { lines } = useAppSelector(state => state.booksReducer)
    const { error } = useAppSelector(state => state.userReducer)

    const [errorMessage, setErrorMessage] = useState<string | null>(error);

    // console.log(errorMessage)

    const handleError = (message: string) => {
        setErrorMessage(message);
    };

    const handleCloseError = () => {
        setErrorMessage(null);
    };

    useEffect(() => {
        if (error) {
            handleError(error)
        }
    }, [error])

    return (
        <>  
            {/* <Header/> */}
            <main className={classes.siteContainer}>
                <Filter/>
                <ModalFilter
                visable={visable}
                setVisable={setVisable}/>
                <Books lines={lines}></Books>
            </main>
            {/* <Footer/> */}
            {errorMessage && (
                    <ModalError message={errorMessage} onClose={handleCloseError} />
                )}
        </>
    )

}

export default BooksPage