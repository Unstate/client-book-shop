import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'
import Preloader from './Preloader'


const Books = () => {

    const dispatch = useAppDispatch()
    const { books, isLoading } = useAppSelector(state => state.booksReducer)
    const { totalPages } = useAppSelector(state => state.booksReducer)
    const [page, setPage] = useState(1)
    const limit = 12
    const pagesArray: number[] = []

    for (let i = 1; i < totalPages + 1; i++) {
        pagesArray.push(i)
    }
    console.log(pagesArray)


    // прописать редьюесер фильтрации, который будет засовывать новый
    // отфильтрованный массив вместо старого, и из-за того, что 
    // изменился бизнес, то по FLUX изменится и UI, поэтому все отри
    // суется и должно быть найс. То есть, если подытожить, то просто
    // для фильтрации написать редьюсер, который будет работать с массивом
    // специально созданным для фильтрации, и уже именно этот массив 
    // передавать во все компоненты, а если этот массив будет пустым, то
    // передавать обычный массив книг

    //ВРОДЕ БЫ НЕ НАДО НИЧЕГО ПРОПИСЫВАТЬ, А ВСЕ СДЕЛАТЬ ЧЕРЕЗ ЗАПРОСЫ APIшки

    //Сделать компонент Pagination, и сделать пагинацию, также сделать отдельный редьюсер под это

    useEffect(() => {
        dispatch(fetchBooks(limit, page))
        // console.log(books)
    }, [page])

    return (
        <>
            {isLoading
                ? <Preloader></Preloader>
                : <div className={classes.booksContainer}>
                    {books.map((book) =>
                        <Book
                            key={book._id}
                            id={book._id}
                            author={book.authors}
                            title={book.title}
                            genres={book.genres}
                            img={book.img}></Book>)}
                    <div>
                        {pagesArray.map((num, index) =>
                            <button className={classes.buttonPage} key={index} onClick={() => setPage(num)}>{num}</button>)}
                    </div>
                </div>}
        </>
    )
}

export default Books