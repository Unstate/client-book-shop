import { useEffect } from 'react'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'
import Preloader from './Preloader'
import { booksSlice } from '../ReduxToolkit/bookSlice'
import PaginationF from './Pagination/Pagination'


const Books = () => {

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

    //Готовый поиск, осталось добавить поп ап с результатами

    // const filteredBooks = (books:BooksProps[]) => {
        
    //     const searchedBooks = () => {
    //         return books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()))
    //     }

    //     return searchedBooks()
    // }

    // const searchedBooks = filteredBooks(books)

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <div className={classes.booksContainer}>
                    {/* <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='aighfsuhfushdf'></input> */}
                    {books.map((book) =>
                        <Book
                            key={book._id}
                            id={book._id}
                            author={book.authors}
                            title={book.title}
                            genres={book.genres}
                            img={book.img}></Book>)}
                    <PaginationF
                        currentPage={page}
                        lastPage={totalPages}
                        maxLength={7}
                        setCurrentPage={setCurrentPage}></PaginationF>
                </div>}
        </>
    )
}

export default Books