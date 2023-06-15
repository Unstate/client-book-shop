import { FC } from "react"
import { Image } from "../ReduxToolkit/bookSlice";
import classes from '../styles/Book.module.css'
import cat from '../assets/cat.jpeg'
import { Link } from "react-router-dom";

export interface BookProps {
    author: string[],
    title: string,
    genres: string[];
    img: Image;
    id: string;
}

const Book: FC<BookProps> = ({ author, title, genres, img, id }) => {
    return (
        <div className={classes.bookContainer}>
            <div className={classes.imageContainer}>   
                {img.thumbnail
                    ? <Link to={`/books/${id}`}>
                        <img className={classes.image} src={img.thumbnail} alt="Картинка не прогрузилась" 
                        onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                            currentTarget.onerror = null
                            currentTarget.src = cat
                        }}></img>
                    </Link>
                    : <Link to={`/books/${id}`}>
                        <img className={classes.image} src={cat} alt="Картинка не прогрузилась" 
                        onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                            currentTarget.onerror = null
                            currentTarget.src = cat
                        }}></img>
                    </Link>}
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.titleContainer}>
                    <Link to={`/books/${id}`}>{title}</Link>
                </div>
                <div className={classes.authorContainer}>
                    {(author && author.length) ? <Link to="/author">{author[0]}</Link> : <a href="#">{author}</a>}
                </div>
            </div>
            <div className={classes.bookButtonContainer}>
                <button className={classes.bookButton}>Хочу почитать</button>
            </div>
        </div>
    )
}

export default Book