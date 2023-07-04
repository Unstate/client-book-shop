import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector, useBooks } from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'
import Preloader from './Preloader'
import { BooksProps, booksSlice } from '../ReduxToolkit/bookSlice'
import PaginationF from './Pagination/Pagination'


const Books = () => {

    const dispatch = useAppDispatch()
    const { books, isLoading } = useAppSelector(state => state.booksReducer)
    const { totalPages } = useAppSelector(state => state.booksReducer)
    const { page } = useAppSelector(state => state.booksReducer)
    const [value, setValue] = useState<string>('')
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

    //сделать так, что работает два массива, один в котором все книги, а другой, в котором только сортированные

    useEffect(()=>{
        const useFilterBooks:(books:BooksProps[], value:string) => BooksProps[] = () => {
            if (value != '') {
                return books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()))
            } else {
                return books
            }
        }
        dispatch(booksSlice.actions.filterBooks(useFilterBooks(books,value)))
    },[value])

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <div className={classes.booksContainer}>
                    <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='aighfsuhfushdf'></input>
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