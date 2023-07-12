import { CSSProperties, FC, useEffect, useState } from 'react'
import classes from '../styles/Comments.module.css'
import ModalComment from './UI/modal/ModalComment/ModalComment'
import MyButton from './UI/button/MyButton'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getBookByIdComments } from '../ReduxToolkit/actionCreators'
import Comment from './Comment'

interface IComments {
    id: string;
}

const Comments: FC<IComments> = ({ id }) => {

    const [visable, setVisable] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector(state => state.userReducer)
    const { comments } = useAppSelector(state => state.booksReducer)
    const styles: CSSProperties = {
        width: '250px',
        padding: '12px 0',
    }

    useEffect(() => {
        dispatch(getBookByIdComments(id))
    }, [])

    const handleClick = () => {
        setVisable(true)
    }

    user && isAuth ? console.log() : ''

    return (
        <>
            <div>
                <div className={classes.aboutBookTitle}>
                    <p>
                        Комментарии
                    </p>
                    <MyButton
                        onClick={handleClick}
                        styles={styles}>Написать комментарий</MyButton>
                </div>
                <ModalComment
                    id={id}
                    visable={visable}
                    setVisable={setVisable}>Оставить комментарий</ModalComment>
                <div>
                    {comments.length 
                    ? comments.map(comment =>
                        <Comment
                            key={comment._id}
                            title={comment.title}
                            description={comment.text}
                            rating={comment.rating}
                            dislikes={comment.dislikes}
                            date={comment.date}
                            likes={comment.likes}
                            userId={comment.userId}></Comment>)
                    : <p className={classes.emptyComments}>Комментариев ещё нет — вы можете быть первым</p>}
                </div>
                {comments.length 
                ? <button>Показать больше комментариев</button>
                : <></>}
            </div>
        </>
    )
}

export default Comments