import MyButton from '../../button/MyButton';
import classes from './ModalLogOut.module.css'
import duckFoots from '../../../../assets/duck-footprints.svg'
import { useAppDispatch } from '../../../../hooks/redux';
import { logout } from '../../../../ReduxToolkit/actionCreators';
import { Navigate } from 'react-router-dom';

interface ModalLogOutProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const styles: React.CSSProperties = {
    width: '326px',
    padding: '15px 0',
}

const ModalLogOut: React.FC<ModalLogOutProps> = ({ children, visable, setVisable }) => {

    const dispatch = useAppDispatch()

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <p
                            className={classes.modalTitle}>
                            {children}
                        </p>
                        <div className={classes.modalImageContainer}><img src={duckFoots} /></div>
                        <div className={classes.modalButtonContainer}>
                            <MyButton
                                styles={styles}
                                onClick={() => {
                                    dispatch(logout())
                                    setVisable(false)
                                    window.location.assign('/login');
                                }}>
                                Да, выйти
                            </MyButton>
                            <MyButton
                                styles={styles}
                                onClick={() => setVisable(false)}>
                                Нет, остаться
                            </MyButton>
                        </div>
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalLogOut