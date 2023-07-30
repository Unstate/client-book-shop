import classes from './../styles/User.module.css'
import goose from '../assets/Goose.svg'
import url from '../assets/url.svg'
import { useState } from "react"
import ModalUploader from "./UI/modal/ModalUploader/ModalUploader"
import ModalName from "./UI/modal/ModalName/ModalName"
import ModalPassword from "./UI/modal/ModalPassword/ModalPassword"
import ModalLogOut from "./UI/modal/ModalLogOut/ModalLogOut"
import Book from "./Book"
import { IFavoritebooks } from "../ReduxToolkit/userSlice"
// import { getUserComments } from '../ReduxToolkit/actionCreators'
import { IComments, ILikeAndDislike } from '../ReduxToolkit/bookSlice'
import Comment from './Comment'
// import ModalError from './UI/modal/modalError/ModalError'

interface UserProps {
    id: string;
    email: string;
    username: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    logo: string;
    favouriteBooks: IFavoritebooks;
    comments: IComments[];
    error: string
}

const ITEMS_PER_PAGE = 3

const User: React.FC<UserProps> = (
    {
        email,
        // error,
        logo,
        comments,
        username,
        id,
        favouriteBooks
    }) => {
    // console.log(comments)
    const [visables, setVisables] = useState({
        visableName: false,
        visableImg: false,
        visableLogOut: false,
        visableEmail: false,
        visablePassword: false,
    })
    // const [items, setItems] = useState<IComments[]>(comments)
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(ITEMS_PER_PAGE)

    const showMoreItems = () => {
        setVisibleItemsCount(count => count + ITEMS_PER_PAGE);
    };

    const visableName: (data: boolean) => void = (data) => {
        setVisables(prev => ({ ...prev, visableName: data }))
    }

    const visableImg: (data: boolean) => void = (data) => {
        setVisables(prev => ({ ...prev, visableImg: data }))
    }

    const visableLogOut: (data: boolean) => void = (data) => {
        setVisables(prev => ({ ...prev, visableLogOut: data }))
    }

    const visableEmail: (data: boolean) => void = (data) => {
        setVisables(prev => ({ ...prev, visableEmail: data }))
    }

    const visablePassword: (data: boolean) => void = (data) => {
        setVisables(prev => ({ ...prev, visablePassword: data }))
    }

    // getUserComments(id)
    // const [errorMessage, setErrorMessage] = useState<string | null>(error);

    // // console.log(errorMessage)

    // const handleError = (message: string) => {
    //     setErrorMessage(message);
    // };

    // const handleCloseError = () => {
    //     setErrorMessage(null);
    // };

    const checkExtendOfUserId:(arr:ILikeAndDislike[],userId:string) => boolean = (arr, userId) => {
        return arr?.some(el => el?.userId === userId)
    }

    // useEffect(() => {
    //     if (error) {
    //         handleError(error)
    //     }
    // }, [error])
    return (
        <>
            <div className={classes.userContainer}>
                {/* {errorMessage && (
                    <ModalError message={errorMessage} onClose={handleCloseError} />
                )} */}

                {/* Example button that triggers an error */}
                {/* <button onClick={() => handleError('Something went wrong!')}>Trigger error</button> */}
                <p className={classes.personData}>Личные данные</p>
                <div className={classes.userProfile}>
                    <div className={classes.userCard}>
                        <div className={classes.userImageContainer}>
                            <img
                                className={classes.userImage}
                                src={logo ? logo : goose}
                                // src={`http://localhost:5173/b38abdbb-5bef-47e4-9d90-61fc61952f45`}
                                alt="Картинка не прогрузилась"
                                onError={({ currentTarget }) => { // Обработка ошибки при загрузке картинки
                                    currentTarget.onerror = null
                                    currentTarget.src = goose
                                }} />
                        </div>
                        <div>
                            <img
                                className={classes.urlImage}
                                src={url} />
                            <div>
                                <div className={classes.userCardInfo}>
                                    <div className={classes.itemTitle}>Имя пользователя</div>
                                    <div className={classes.itemDesc}>{username}</div>
                                </div>
                                <div className={classes.userCardInfo}>
                                    <div className={classes.itemTitle}>E-mail</div>
                                    <div className={classes.itemDesc}>{email}</div>
                                </div>
                                <div className={classes.userCardInfo}>
                                    <div className={classes.itemTitle}>Пароль</div>
                                    <div className={classes.itemDesc}>***********</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <button
                            className={classes.userProfileButton}
                            onClick={() => visableImg(true)}>
                            изменить фотографию
                        </button>
                        <button
                            className={classes.userProfileButton}
                            onClick={() => visableName(true)}>
                            изменить имя пользователя
                        </button>
                        <button
                            className={classes.userProfileButton}
                            onClick={() => visableEmail(true)}>
                            изменить E-mail
                        </button>
                        <button
                            className={classes.userProfileButton}
                            onClick={() => visablePassword(true)}>
                            изменить пароль
                        </button>
                        <button
                            className={`${classes.userProfileButton} ${classes.userLogOut}`}
                            onClick={() => visableLogOut(true)}>
                            выйти из аккаунта
                        </button>
                    </div>
                </div>
                <hr></hr>
                <div className='mb-[30px]'>
                    <p className=' text-[#160F29] text-[25px] my-[30px] font-semibold'>Закладки</p>
                    <div className={classes.booksContainer}>
                        {favouriteBooks.books
                            ? favouriteBooks.books.map(book => <Book
                                isDelete={true}
                                key={book._id}
                                author={book.authors}
                                title={book.title}
                                genres={book.genres}
                                img={book.img}
                                id={book._id}
                                description={book.description}
                                pageCount={book.pageCount}
                                publisher={book.publisher} />)
                            : <p>Закладок ещё нет — вы можете добавить первую книгу!</p>}
                    </div>
                    {/* <p className='mt-[30px] text-center' */}
                    {/* onClick={() => {}}>Показать больше книг</p> */}
                </div>
                <hr></hr>
                <div>
                    <p className=' text-[#160F29] text-[25px] my-[30px] font-semibold'>Комментарии</p>
                    <div>
                        {comments.slice(0, visibleItemsCount).map(comment => <Comment
                            checkExtendOfUserId={checkExtendOfUserId}
                            currentUser={id}
                            commentId={comment._id}
                            key={comment._id}
                            title={comment.title}
                            description={comment.text}
                            rating={comment.rating}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                            date={comment.date}
                            userId={comment.userId}></Comment>)}
                    </div>
                    <p
                        className='text-center text-[#160F29] cursor-pointer hover:text-[#246A73] text-[20px] font-semibold'
                        onClick={showMoreItems}>Показать больше комменатриев</p>
                </div>

                <ModalName
                    type={'name'}
                    id={id}
                    visable={visables.visableName}
                    setVisable={visableName} />
                <ModalUploader
                    id={id}
                    visable={visables.visableImg}
                    setVisable={visableImg}>Изменение фотографии</ModalUploader>
                <ModalName
                    id={id}
                    type={'email'}
                    visable={visables.visableEmail}
                    setVisable={visableEmail} />
                <ModalPassword
                    userId={id}
                    visable={visables.visablePassword}
                    setVisable={visablePassword}>Изменение пароля</ModalPassword>
                <ModalLogOut
                    visable={visables.visableLogOut}
                    setVisable={visableLogOut}>Вы уверены, что хотите выйти?</ModalLogOut>
            </div>
        </>
    )
}

export default User