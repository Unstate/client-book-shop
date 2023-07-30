import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect, useState } from 'react'
import { getBookById } from '../ReduxToolkit/actionCreators'
import CertainBook from '../components/CertainBook'
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalError from '../components/UI/modal/modalError/ModalError'


const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { book, isLoading, error } = useAppSelector(state => state.certainBookReducer)
    const { id } = useParams()

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

    useEffect(() => {
        dispatch(getBookById(id))
    }, [])

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <main>
                    {/* <Header/> */}
                    <CertainBook
                        authors={book.authors}
                        bookBinding={book.bookBinding}
                        bookSeries={book.bookSeries}
                        comments={book.comments}
                        description={book.description}
                        genres={book.genres}
                        img={book.img}
                        pageCount={book.pageCount}
                        painters={book.painters}
                        publishedDate={book.publishedDate}
                        publisher={book.publisher}
                        title={book.title}
                        translaters={book.translaters}
                        id={book._id}></CertainBook>
                    {/* <Footer/> */}
                </main>}
                {errorMessage && (
                    <ModalError message={errorMessage} onClose={handleCloseError} />
                )}
        </>
    )
}

export default CertainBookPage