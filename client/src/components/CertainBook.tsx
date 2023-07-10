import { Image } from "../ReduxToolkit/bookSlice"
import classes from '../styles/CertainBook.module.css'
import BookInfo from "./BookInfo";
import BookSpecifications from "./BookSpecifications";
import Comments from "./Comments";

interface CertainBookProps {
    authors: string[];
    bookBinding: string;
    bookSeries: string;
    comments: any[];
    description: string;
    genres: string[];
    img: Image;
    pageCount: number;
    painters: string[];
    publishedDate: string;
    publisher: string;
    title: string;
    translaters: string[];
    id: string;
}

const CertainBook: React.FC<CertainBookProps> = (
    {
        id,
        authors,
        bookBinding,
        bookSeries,
        comments,
        description,
        genres,
        img,
        pageCount,
        painters,
        publishedDate,
        publisher,
        title,
        translaters
    }) => {

    const bread = `Все книги / ${title}`

    return (
        <div className={classes.certainBookContainer}>
            <div className={classes.bread}>{bread}</div>
            <BookInfo
                img={img}
                title={title}
                authors={authors}
                description={description}
                genres={genres}
                publisher={publisher}
                bookSeries={bookSeries}
                pageCount={pageCount}></BookInfo>
            <hr></hr>
            <BookSpecifications
                authors={authors}
                bookBinding={bookBinding}
                bookSeries={bookSeries}
                description={description}
                genres={genres}
                pageCount={pageCount}
                painters={painters}
                publishedDate={publishedDate}
                publisher={publisher}
                translaters={translaters}></BookSpecifications>
            <hr></hr>
            <Comments
                id={id}></Comments>
        </div>
    )
}

export default CertainBook