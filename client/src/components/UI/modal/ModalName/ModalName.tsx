import { FC } from 'react'
import classes from './ModalName.module.css'
import cross from '../../../../assets/Cross.svg'

interface ModalNameProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const ModalName: FC<ModalNameProps> = ({ children, visable, setVisable }) => {

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>
                            <div>{children}</div>
                            <img src={cross} className={classes.crossImage} onClick={() => setVisable(false)}></img>
                        </div>
                        <div className={classes.modalInputContainer}><input type="text" className={classes.modalInput} placeholder='Введите новое имя пользователя' /></div>
                        {/* эта кнопка будет отправлять изменение на сервер */}
                        <button className={classes.modalButton} onClick={() => setVisable(false)}>Сохранить изменения</button>
                        {/* именно она, та что сверху от этой строчки */}
                    </div>
                </div>
                : <div className={`${classes.modalWrapper} ${classes.disable}`}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>{children}</div>
                        <div className={classes.modalInputContainer}><input type="text" className={classes.modalInput} placeholder='Введите новое имя пользователя' /></div>
                        <button className={classes.modalButton}>Сохранить изменения</button>
                    </div>
                </div>}
        </>
    )
}

export default ModalName