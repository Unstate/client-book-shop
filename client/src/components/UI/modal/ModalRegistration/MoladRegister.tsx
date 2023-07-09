import MyButton from '../../button/MyButton';
import classes from './ModalRegister.module.css'
import message from '../../../../assets/message.svg'

interface ModalRegisterProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const styles: React.CSSProperties = {
    width: '100%',
    padding: '15px 0',
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ children, visable, setVisable }) => {
    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <p
                            className={classes.modalTitle}>
                            {children}
                        </p>
                        <p
                            className={classes.modalDescription}>
                            Проверьте свою почту и следуйте указаниям в инструкции
                        </p>
                        <div className={classes.modalImageContainer}><img src={message}/></div>
                        <MyButton
                            styles={styles}
                            onClick={() => setVisable(false)}>
                            Продолжить
                        </MyButton>
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalRegister