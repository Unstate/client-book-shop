import { FC, useState } from 'react'
import classes from './ModalComment.module.css'
import cross from '../../../../assets/Cross.svg'
import StarRating from '../../starRating/StarRating';
import { useAppDispatch } from '../../../../hooks/redux';
import { setNewBookComment } from '../../../../ReduxToolkit/actionCreators';

interface ModalCommentProps {
    id: string;
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const ModalComment: FC<ModalCommentProps> = ({ children, visable, setVisable, id }) => {

    // сделать обработку ошибки, если статус код 401, то пользователь не авторизован
    // нужно вывести ему это, что тип пошел нахуй, с

    const [rating, setRating] = useState<number>(0)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const handleReset = () => {
        setRating(0)
    }

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>
                            <p>{children}</p>
                            <img
                                src={cross}
                                className={classes.crossImage}
                                onClick={() => setVisable(false)} />
                        </div>
                        <StarRating
                            rating={rating}
                            handleRating={handleRating}></StarRating>
                        <div className={classes.modalInputContainer}>
                            <input
                                type="text"
                                className={classes.modalInput}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Заголовок *' />
                        </div>
                        <div className={classes.modalInputContainer}>
                            <input
                                type="text"
                                className={classes.modalInput}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Комментарий *' />
                        </div>
                        <button
                            className={classes.modalButton} 
                            onClick={() => {
                                dispatch(setNewBookComment(id, title, description, rating))
                                setVisable(false)
                            }}>Опубликовать
                        </button>
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalComment