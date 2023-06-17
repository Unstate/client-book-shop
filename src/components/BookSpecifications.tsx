import classes from '../styles/BookSpecifications.module.css'

interface BookSpecificationsProps {
    authors: any[];
    description: string;
    genres: any[];
    publisher: string;
    bookSeries: string;
    pageCount: number
    painters: any[];
    bookBinding: string;
    translaters: any[];
    publishedDate: string;
}

const BookSpecifications:React.FC<BookSpecificationsProps> = ({description, genres, publisher, bookSeries, bookBinding, painters, translaters, pageCount, publishedDate}) => {
    return (
        <div className={classes.aboutBookContainer}>
            <div id="section1" className={classes.aboutBookTitle}>О книге</div>
            <div className={classes.aboutBookDescription}>{description}</div>
            <div id="section2" className={classes.aboutBookTitle}>Характеристики</div>
            <div className="flex space-x-[70px] mb-[30px]">
                <div>
                    <div className={classes.charItem}>
                        <div className={classes.itemF}>Жанр</div>
                        <div className={classes.itemD}>{genres.map((genre, index) => <div key={index}>{genre}</div>)}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemF}>Издательство</div>
                        <div className={classes.itemD}>{publisher}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemF}>Серия</div>
                        <div className={classes.itemD}>{bookSeries}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemF}>Переплет</div>
                        <div className={classes.itemD}>{bookBinding}</div>
                    </div>
                </div>
                <div>
                    <div className={classes.charItem}>
                        <div className={classes.itemS}>Художник</div>
                        <div className={classes.itemD}>{painters.length ? painters.map((painter, index) => <div key={index}>{painter}</div>) : <div> — </div>}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemS}>Переводчик</div>
                        <div className={classes.itemD}>{translaters.length ? translaters.map((translater, index) => <div key={index}>{translater}</div>) : <div> — </div>}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemS}>Год издания</div>
                        <div className={classes.itemD}>{publishedDate}</div>
                    </div>
                    <div className={classes.charItem}>
                        <div className={classes.itemS}>Количество страниц</div>
                        <div className={classes.itemD}>{pageCount}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSpecifications