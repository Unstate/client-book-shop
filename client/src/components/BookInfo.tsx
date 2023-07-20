import { Image } from '../ReduxToolkit/bookSlice'
import classes from '../styles/BookInfo.module.css'
import cat from '../assets/Cover big.svg'
import { Link, animateScroll as scroll } from "react-scroll";
// import { Link, animateScroll as scroll } from "react-scroll";

interface BookInfoProps {
    img: Image;
    title: string;
    authors: any[];
    description: string;
    genres: any[];
    publisher: string;
    bookSeries: string;
    pageCount: number
}

const BookInfo: React.FC<BookInfoProps> = (
    { img,
        title,
        authors,
        description,
        genres,
        publisher,
        bookSeries,
        pageCount
    }) => {
    return (
        <>
            <div className={classes.book}>
                <div className={classes.bookImageContainer}>
                    <img
                        className={classes.bookImage}
                        src={img.largeFingernail}
                        alt='Картинка не прогрузилась'
                        onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                            currentTarget.onerror = null
                            currentTarget.src = cat
                        }} />
                </div>
                <div className={classes.aboutBookContainer}>
                    <div className={classes.bookTitleContainer}>
                        <div className={classes.bookTitle}>{title}</div>
                        <div className={classes.bookAuthors}>{authors}</div>
                    </div>
                    <div className={classes.bookInfoContainer}>
                        <div className={classes.bookDescription}>
                            <div className={classes.bookDesc}>{description}</div>
                            <div className={classes.linkReadMoreContainer}>
                                {/* <a
                                    href="#section1"
                                    className={classes.linkReadMore}>
                                    Читать далее
                                </a> */}
                                <Link
                                    activeClass="active"
                                    to="section1"
                                    spy={true}
                                    smooth={true}
                                    offset={-10}
                                    duration={400}
                                    className={classes.linkReadMore}
                                >Читать далее</Link>
                                {/* <Link
                                    to="#section1"
                                    smooth={true} duration={500}
                                    className={classes.linkReadMore}>
                                    Читать далее
                                </Link> */}
                            </div>
                            <div>
                                <button
                                    className={classes.bookButton}>
                                    Хочу почитать
                                </button>
                            </div>
                        </div>
                        <div className={classes.nameCell}>
                            <p className={classes.item}>Жанр</p>
                            <p className={classes.item}>Издательство</p>
                            <p className={classes.item}>Серия</p>
                            <p className={classes.item}>Количество страниц</p>
                            <Link
                                    activeClass="active"
                                    to="section2"
                                    spy={true}
                                    smooth={true}
                                    offset={-10}
                                    duration={400}
                                    className={classes.allChar}
                                >Все характеристики</Link>
                            {/* <a href="#section2" className={classes.allChar}>Все характеристики</a> */}
                        </div>
                        <div className={classes.descriptionCell}>
                            <p className={classes.dItem}>{genres[0]}</p>
                            <p className={classes.dItem}>{publisher}</p>
                            <p className={classes.dItem}>{bookSeries}</p>
                            <p className={classes.dItem}>{pageCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookInfo