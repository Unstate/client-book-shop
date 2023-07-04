import { IUser } from "./models/IUser"
import classes from './../styles/User.module.css'
import goose from '../assets/Goose.svg'
import url from '../assets/url.svg'
import { useState } from "react"
import ModalUploader from "./UI/modal/ModalUploader/ModalUploader"
import ModalName from "./UI/modal/ModalName/ModalName"
import ModalPassword from "./UI/modal/ModalPassword/ModalPassword"
import ModalComment from "./UI/modal/ModalComment/ModalComment"
import StarRating from "./UI/starRating/StarRating"


const User: React.FC<IUser> = ({ email, isActivated, logo, password, username, id }) => {

    const [visableName, setVisableName] = useState<boolean>(false)
    const [visableImg, setVisableImg] = useState<boolean>(false)
    const [visableEmail, setVisableEmail] = useState<boolean>(false)
    const [visablePassword, setVisablePassword] = useState<boolean>(false)

    return (
        <>
            <div className={classes.userContainer}>
                Личные данные
                <div className={classes.userProfile}>
                    <div className={classes.userCard}>
                        <div className={classes.userImageContainer}><img className={classes.userImage} src={goose}></img></div>
                        <div>
                            <img className={classes.urlImage} src={url}></img>
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
                        <button className={classes.userProfileButton} onClick={() => setVisableImg(true)}>изменить фотографию</button>
                        <button className={classes.userProfileButton} onClick={() => setVisableName(true)}>изменить имя пользователя</button>
                        <button className={classes.userProfileButton} onClick={() => setVisableEmail(true)}>изменить E-mail</button>
                        <button className={classes.userProfileButton} onClick={() => setVisablePassword(true)}>изменить пароль</button>
                    </div>
                </div>
                <hr></hr>
                <div>Закладки</div>
                <div>Комментарии</div>
                <ModalName
                    visable={visableName}
                    setVisable={setVisableName}>Изменение имени пользователя</ModalName>
                <ModalUploader
                    visable={visableImg}
                    setVisable={setVisableImg}>Изменение фотографии</ModalUploader>
                <ModalName
                    visable={visableEmail}
                    setVisable={setVisableEmail}>Изменение E-mail</ModalName>
                <ModalPassword
                    visable={visablePassword}
                    setVisable={setVisablePassword}>Изменение пароля</ModalPassword>
            </div>
        </>
    )
}

export default User