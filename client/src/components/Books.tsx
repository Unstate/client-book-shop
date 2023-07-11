import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'
import Preloader from './Preloader'
import { booksSlice } from '../ReduxToolkit/bookSlice'
import Pagination from './Pagination/Pagination'
import BookLine from './BookLine'

interface BooksProps {
    lines: boolean,
}

const Books: React.FC<BooksProps> = ({ lines }) => {

    const dispatch = useAppDispatch()
    const { books, isLoading } = useAppSelector(state => state.booksReducer)
    const { totalPages } = useAppSelector(state => state.booksReducer)
    const { page } = useAppSelector(state => state.booksReducer)
    const limit = 16
    const pagesArray: number[] = []

    for (let i = 1; i < totalPages + 1; i++) {
        pagesArray.push(i)
    }


    useEffect(() => {
        dispatch(fetchBooks(limit, page))
    }, [page])


    const setCurrentPage = (num: number) => {
        dispatch(booksSlice.actions.setCurrentPage(num))
    }

    console.log(books)

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <div className={classes.booksContainer}>
                    {lines
                        ? books.map((book) =>
                            <BookLine
                                key={book._id}
                                id={book._id}
                                author={book.authors}
                                title={book.title}
                                pageCount={book.pageCount}
                                img={book.img}
                                publisher={book.publisher}
                                description={book.description}/>)
                        : books.map((book) =>
                            <Book
                                key={book._id}
                                id={book._id}
                                author={book.authors}
                                title={book.title}
                                genres={book.genres}
                                img={book.img}></Book>)}
                    <Pagination
                        currentPage={page}
                        lastPage={totalPages}
                        maxLength={7}
                        setCurrentPage={setCurrentPage}></Pagination>
                </div>}
        </>
    )
}

export default Books