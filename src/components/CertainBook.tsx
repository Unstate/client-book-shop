import { Image } from "../ReduxToolkit/bookSlice"
import classes from '../styles/CertainBook.module.css'

interface CertainBookProps {
    img: Image;
    title: string;
    authors: string[];
    description: string;
    genre: string[];
}

const CertainBook: React.FC<CertainBookProps> = ({ img, title, authors, description, genre }) => {
    return (
        <>
            <div className={classes.book}>
                <div className={classes.bookImageContainer}>
                    <img className={classes.bookImage} src={img.smallThumbnail}></img>
                </div>
                <div className={classes.aboutBookContainer}>
                    <div className={classes.bookTitleContainer}>
                        <div className={classes.bookTitle}>{title}</div>
                        <div className={classes.bookAuthors}>{authors}</div>
                    </div>
                    <div className={classes.bookInfoContainer}>
                        <div className={classes.bookDescription}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatum at pariatur sequi iure officiis quia aliquam! Et hic, voluptas, omnis laborum fugit possimus voluptates quis exercitationem sit temporibus sed!
                            Sunt doloribus voluptatum expedita vel consectetur possimus, saepe vero voluptates nostrum nemo, autem iusto eaque neque rem obcaecati. Ea error placeat consequuntur! Consequuntur explicabo error laborum, minus corrupti sed enim?
                            Deleniti, consequuntur delectus architecto nihil cumque odio excepturi libero temporibus veniam, consectetur inventore eius sequi modi. Cum minus recusandae ex. Debitis commodi natus temporibus, corporis molestiae quam nesciunt doloremque voluptas!
                            Modi quibusdam aliquid molestias, sunt consequuntur fugiat odit sed distinctio ipsa ratione quam in iure deleniti optio rerum quidem amet iusto? Aperiam asperiores aliquam itaque perferendis dolorum magnam illum iusto!
                            Saepe quaerat veniam architecto nostrum numquam ipsa minima id beatae temporibus suscipit! Architecto necessitatibus iure, expedita corporis qui quo at possimus ipsum nulla debitis dolorum eveniet pariatur voluptate, doloremque beatae!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CertainBook