import { ChangeEvent, FC, useState } from 'react'
import classes from './ModalName.module.css'
import cross from '../../../../assets/Cross.svg'
import { changeUserEmail, changeUserName, resetPassword } from '../../../../ReduxToolkit/actionCreators';
import ModalPasswordAccess from '../ModalPassword/ModalPasswordAccess';
import { useAppDispatch } from '../../../../hooks/redux';

interface ModalNameProps {
    // children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
    id: string;
    type: 'name' | 'email' | 'reset';
    // email: string;
}

interface Iitem {
    title: string;
    usedFunction: Function;
    buttonPlaceholder: string;
    inputPlaceholder: string
}

interface IContentToRender {
    name: Iitem,
    email: Iitem,
    reset: Iitem,
}

const contentToRender:IContentToRender = {
    name: {
        title: 'Изменение имени пользователя',
        usedFunction: changeUserName,
        inputPlaceholder: 'Введите новое имя пользователя',
        buttonPlaceholder: 'Сохранить изменения',
    },
    email: {
        title: 'Изменение E-mail',
        usedFunction: changeUserEmail,
        inputPlaceholder: 'Введите новый адрес E-mail',
        buttonPlaceholder: 'Сохранить изменения',
    },
    reset: {
        title: 'Забыли пароль? Введите ваш E-mail чтобы сбросить пароль',
        usedFunction: resetPassword,
        inputPlaceholder: 'mooduck@mail.ru',
        buttonPlaceholder: 'Сбросить пароль',
    }
}

const ModalName: FC<ModalNameProps> = ({
    // children,
    visable,
    setVisable,
    id,
    type,
    // email    
}) => {

    const [value, setValue] = useState<string>('')
    const [visablePassword, setVisablePassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleOnChange:(e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>
                            {/* <p>{children}</p> */}
                            <p>{contentToRender[type as keyof IContentToRender].title}</p>
                            <img className={classes.crossImage}
                                src={cross}
                                onClick={() => setVisable(false)}>
                            </img>
                        </div>
                        <div className={classes.modalInputContainer}>
                            <input className={classes.modalInput}
                                type="text"
                                onChange={handleOnChange}
                                // placeholder={type === 'name' ? 'Введите новое имя пользователя' : 'Введите новый адрес E-mail'} />
                                placeholder={contentToRender[type as keyof IContentToRender].inputPlaceholder} />
                        </div>
                        <button
                            className={classes.modalButton}
                            onClick={() => {
                                type === 'name' ? changeUserName(id,value) : 
                                type === 'email' ? changeUserEmail(id,value) :
                                type === 'reset' ? resetPassword(value) : <></>
                                setVisable(false)
                                setVisablePassword(true)
                            }}>
                            {contentToRender[type as keyof IContentToRender].buttonPlaceholder}
                        </button>
                    </div>
                </div>
                : <ModalPasswordAccess
                id={id}
                type={true}
                visable={visablePassword}
                setVisable={setVisablePassword}>Введите код подтверждения и новый пароль</ModalPasswordAccess>}
        </>
    )
}

export default ModalName