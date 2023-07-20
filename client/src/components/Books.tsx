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
    const { books, isLoading, totalPages, page } = useAppSelector(state => state.booksReducer)
    const { favouriteBooks } = useAppSelector(state => state.userReducer)
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

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <div className={classes.contentContainer}>
                    <div className={classes.books}>
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
                                    description={book.description} />)
                            : books.map(book => {
                                const isFavourite = favouriteBooks.books.some(favouriteBook => 
                                    favouriteBook._id === book._id)
                                return <Book
                                        isDelete={isFavourite}
                                        key={book._id}
                                        id={book._id}
                                        author={book.authors}
                                        title={book.title}
                                        genres={book.genres}
                                        img={book.img}
                                        description={book.description}
                                        pageCount={book.pageCount}
                                        publisher={book.publisher}/>
                            })}
                            {/* // books.map((book) =>
                            //     <Book
                            //         isDelete={false}
                            //         key={book._id}
                            //         id={book._id}
                            //         author={book.authors}
                            //         title={book.title}
                            //         genres={book.genres}
                            //         img={book.img}></Book>)} */}
                    </div>
                    <div className={classes.paginationContainer}>
                        <Pagination
                            currentPage={page}
                            lastPage={totalPages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}></Pagination>
                    </div>
                </div>}
        </>
    )
}

export default Books