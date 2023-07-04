import { FC } from "react"
import { Image } from "../ReduxToolkit/bookSlice";
import classes from '../styles/Book.module.css'
import cat from '../assets/Covermiddle.svg'
import { Link } from "react-router-dom";

export interface BookProps {
    author: string[],
    title: string,
    genres: string[];
    img: Image;
    id: string;
}

const Book: FC<BookProps> = ({ author, title, img, id }) => {
    return (
        <div className={classes.bookContainer}>
            <div className={classes.imageContainer}>
                {img
                    ? <Link to={`/books/${id}`}>
                        <img
                            className={classes.image}
                            src={img.mediumFingernail}
                            alt="Картинка не прогрузилась"
                            onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                                currentTarget.onerror = null
                                currentTarget.src = cat
                            }} />
                    </Link>
                    : <Link to={`/books/${id}`}>
                        <img
                            className={classes.image}
                            src={cat}
                            alt="Картинка не прогрузилась"
                            onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                                currentTarget.onerror = null
                                currentTarget.src = cat
                            }} />
                    </Link>}
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
                <button className={classes.bookButton}>
                    Хочу почитать
                </button>
            </div>
        </div>
    )
}

export default Book