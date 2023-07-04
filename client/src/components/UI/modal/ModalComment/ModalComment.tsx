import { FC } from 'react'
import classes from './ModalComment.module.css'
import cross from '../../../../assets/Cross.svg'
import StarRating from '../../starRating/StarRating';

interface ModalCommentProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const ModalComment: FC<ModalCommentProps> = ({ children, visable, setVisable }) => {

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>
                            <div>{children}</div>
                            <img src={cross} className={classes.crossImage} onClick={() => setVisable(false)}></img>
                        </div>
                        <StarRating></StarRating>
                        <div className={classes.modalInputContainer}><input type="text" className={classes.modalInput} placeholder='Заголовок *' /></div>
                        <div className={classes.modalInputContainer}><input type="text" className={classes.modalInput} placeholder='Комментарий *' /></div>
                        {/* эта кнопка будет отправлять изменение на сервер */}
                        <button className={classes.modalButton} onClick={() => setVisable(false)}>Опубликовать</button>
                        {/* именно она, та что сверху от этой строчки */}
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalComment