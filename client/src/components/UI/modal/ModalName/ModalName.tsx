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
                            <p>{children}</p>
                            <img className={classes.crossImage}
                                src={cross}
                                onClick={() => setVisable(false)}>
                            </img>
                        </div>
                        <div className={classes.modalInputContainer}>
                            <input className={classes.modalInput}
                                type="text"
                                placeholder='Введите новое имя пользователя' />
                        </div>
                        {/* эта кнопка будет отправлять изменение на сервер */}
                        <button
                            className={classes.modalButton}
                            onClick={() => setVisable(false)}>
                            Сохранить изменения
                        </button>
                        {/* именно она, та что сверху от этой строчки */}
                    </div>
                </div>
                : <div className={`${classes.modalWrapper} ${classes.disable}`}>
                    <div className={classes.modalContainer}>
                        <p className={classes.modalTitle}>
                            {children}
                        </p>
                        <div className={classes.modalInputContainer}>
                            <input className={classes.modalInput}
                                type="text"
                                placeholder='Введите новое имя пользователя' />
                        </div>
                        <button className={classes.modalButton}>
                            Сохранить изменения
                        </button>
                    </div>
                </div>}
        </>
    )
}

export default ModalName