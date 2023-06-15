import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'

const Books = () => {

    const dispatch = useAppDispatch()
    const { books } = useAppSelector(state => state.booksReducer)

    // прописать редьюесер фильтрации, который будет засовывать новый
    // отфильтрованный массив вместо старого, и из-за того, что 
    // изменился бизнес, то по FLUX изменится и UI, поэтому все отри
    // суется и должно быть найс. То есть, если подытожить, то просто
    // для фильтрации написать редьюсер, который будет работать с массивом
    // специально созданным для фильтрации, и уже именно этот массив 
    // передавать во все компоненты, а если этот массив будет пустым, то
    // передавать обычный массив книг

    //ВРОДЕ БЫ НЕ НАДО НИЧЕГО ПРОПИСЫВАТЬ, А ВСЕ СДЕЛАТЬ ЧЕРЕЗ ЗАПРОСЫ APIшки

    useEffect(() => {
        dispatch(fetchBooks())
        // console.log(books)
    }, [])


    return (
        <div className={classes.booksContainer}>
            {books.map((book) => 
            <Book
            key={book.id}
            id = {book.id}
            author={book.authors}
            title={book.title}
            genres={book.genre}
            img={book.img}></Book>)}
        </div>
    )
}

export default Books