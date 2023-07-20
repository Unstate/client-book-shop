import { ChangeEvent, FC, useEffect, useState } from 'react'
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

    const dispatch = useAppDispatch()

    const [commentData, setCommentData] = useState({
        title: '',
        description: '',
        rating: 0,
    })

    const setTitle: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setCommentData(prev => ({ ...prev, title: e.target.value }))
    }

    const setDescription: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setCommentData(prev => ({ ...prev, description: e.target.value }))
    }

    const handleRating = (rate: number) => {
        setCommentData(prev => ({ ...prev, rating: rate }))
    }

    const handleReset = () => {
        setCommentData(prev => ({ ...prev, rating: 0 }))
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
                            disabled={false}
                            rating={commentData.rating}
                            handleRating={handleRating}></StarRating>
                        <div className={classes.modalInputContainer}>
                            <input
                                type="text"
                                className={classes.modalInput}
                                value={commentData.title}
                                onChange={setTitle}
                                placeholder='Заголовок *' />
                        </div>
                        <div className={classes.modalInputContainer}>
                            <input
                                type="text"
                                className={classes.modalInput}
                                value={commentData.description}
                                onChange={setDescription}
                                placeholder='Комментарий *' />
                        </div>
                        <button
                            className={classes.modalButton}
                            onClick={(e) => {
                                e.preventDefault()
                                setNewBookComment(id, commentData.title, commentData.description, commentData.rating)
                                setVisable(false)
                                handleReset()
                            }}>Опубликовать
                        </button>
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalComment