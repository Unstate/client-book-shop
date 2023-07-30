import { FC } from "react"
import { Image } from "../ReduxToolkit/bookSlice";
import classes from '../styles/Book.module.css'
import cat from '../assets/Covermiddle.svg'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteFavouriteBook, deleteFavouriteBookFromStore, setFavouriteBook, setOneFavouriteBook } from "../ReduxToolkit/actionCreators";

export interface BookProps {
    author: string[],
    title: string,
    genres: string[];
    img: Image;
    id: string;
    isDelete: boolean;
    description: string,
    pageCount: number,
    publisher: string,
}

const Book: FC<BookProps> = ({ author, title, img, id, isDelete, genres, description, pageCount, publisher }) => {

    const { user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const book = {
        _id: id,
        authors: author,
        genres: genres,
        title: title,
        img: img,
        description: description,
        pageCount: pageCount,
        publisher: publisher,
    }

    return (
        <div className={classes.bookContainer}>
            <div className={classes.imageContainer}>
                <Link to={`/books/${id}`}>
                    <img
                        className={classes.image}
                        src={img.mediumFingernail}
                        alt="Картинка не прогрузилась"
                        onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                            currentTarget.onerror = null
                            currentTarget.src = cat
                        }} />
                </Link>
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.titleContainer}>
                    <Link to={`/books/${id}`}>
                        {title}
                    </Link>
                </div>
                <div className={classes.authorContainer}>
                    {(author && author.length)
                        ? <Link to="/author">
                            {author[0]}
                        </Link>
                        : <a href="#">
                            {author}
                        </a>}
                </div>
            </div>
            <div className={classes.bookButtonContainer}>
                {isDelete
                    ? <button
                        className={classes.bookButton}
                        onClick={() => {
                            deleteFavouriteBook(user.id, id)
                            dispatch(deleteFavouriteBookFromStore(id))
                        }
                        }>
                        Не хочу читать
                    </button>
                    : <button
                        className={classes.bookButton}
                        onClick={() => {
                            dispatch(setFavouriteBook(user.id, id))
                            dispatch(setOneFavouriteBook(book))
                        }}>
                        Хочу почитать
                    </button>}
            </div>
        </div>
    )
}

export default Book