import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { getBookById } from '../ReduxToolkit/actionCreators'
import CertainBook from '../components/CertainBook'
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Footer from '../components/Footer'


const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { book, isLoading } = useAppSelector(state => state.certainBookReducer)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getBookById(id))
    }, [])

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <>
                    <Header/>
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
                    <Footer/>
                </>}
        </>
    )
}

export default CertainBookPage