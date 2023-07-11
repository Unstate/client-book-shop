import { FC } from "react"
import { Image } from "../ReduxToolkit/bookSlice";
import classes from '../styles/BookLine.module.css'
import cat from '../assets/Covermiddle.svg'
import { Link } from "react-router-dom";

export interface BookProps {
    author: string[],
    title: string,
    pageCount: number,
    publisher: string,
    description: string,
    img: Image;
    id: string;
}

const BookLine: FC<BookProps> = ({
    author,
    title,
    pageCount,
    publisher,
    description,
    img,
    id,
}) => {
    return (
        <>
            <div className={classes.bookContainer}>
                <div className={classes.withoutButton}>
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
                        <div className={classes.bookDescription}>
                            {description}
                        </div>
                        <div className={classes.publicBookInfo}>
                            {`${publisher}, ${pageCount} страницы`}
                        </div>
                    </div>
                </div>
                <button className={classes.bookButton}>
                    Хочу почитать
                </button>
            </div>
            <hr></hr>
        </>
    )
}

export default BookLine