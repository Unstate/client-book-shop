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

interface UserProps {
    id: string;
    email: string;
    username: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    logo: string;
    favouriteBooks: IFavoritebooks;
}

const User: React.FC<UserProps> = (
    {
        email,
        // isActivated,
        logo,
        // password,
        username,
        id,
        favouriteBooks
    }) => {

    const [visables, setVisables] = useState({
        visableName: false,
        visableImg: false,
        visableLogOut: false,
        visableEmail: false,
        visablePassword: false,
    })

    const visableName:(data:boolean) => void = (data) => {
        setVisables(prev => ({...prev, visableName: data}))
    }

    const visableImg:(data:boolean) => void = (data) => {
        setVisables(prev => ({...prev, visableImg: data}))
    }

    const visableLogOut:(data:boolean) => void = (data) => {
        setVisables(prev => ({...prev, visableLogOut: data}))
    }

    const visableEmail:(data:boolean) => void = (data) => {
        setVisables(prev => ({...prev, visableEmail: data}))
    }

    const visablePassword:(data:boolean) => void = (data) => {
        setVisables(prev => ({...prev, visablePassword: data}))
    }

    return (
        <>
            <div className={classes.userContainer}>
                <p className={classes.personData}>Личные данные</p>
                <div className={classes.userProfile}>
                    <div className={classes.userCard}>
                        <div className={classes.userImageContainer}>
                            <img
                                className={classes.userImage}
                                src={goose}
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
                <div>
                    <p>Закладки</p>
                    <div className={classes.booksContainer}>
                        {favouriteBooks.books
                            ? favouriteBooks.books.map(book => <Book
                                isDelete={true}
                                key={book._id}
                                author={book.authors}
                                title={book.title}
                                genres={book.genres}
                                img={book.img}
                                id={book._id} />)
                            : <p>Закладок ещё нет — вы можете добавить первую книгу!</p>}
                    </div>
                </div>
                <div>Комментарии</div>
                <ModalName
                    type={'name'}
                    id={id}
                    visable={visables.visableName}
                    setVisable={visableName} />
                <ModalUploader
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