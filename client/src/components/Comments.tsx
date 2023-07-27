import { CSSProperties, FC, useEffect, useState } from 'react'
import classes from '../styles/Comments.module.css'
import ModalComment from './UI/modal/ModalComment/ModalComment'
import MyButton from './UI/button/MyButton'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getBookByIdComments } from '../ReduxToolkit/actionCreators'
import Comment from './Comment'
import { ILikeAndDislike } from '../ReduxToolkit/bookSlice'

interface CommentsProps {
    id: string;
}

const ITEMS_PER_PAGE = 3

const Comments: FC<CommentsProps> = ({ id }) => {

    const [visable, setVisable] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector(state => state.userReducer)
    const { comments } = useAppSelector(state => state.booksReducer)
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(ITEMS_PER_PAGE)

    const showMoreItems = () => {
        setVisibleItemsCount(count => count + ITEMS_PER_PAGE);
    };

    const styles: CSSProperties = {
        width: '250px',
        padding: '12px 0',
    }

    useEffect(() => {
        if (id) {
            dispatch(getBookByIdComments(id))
        }
    }, [])

    const handleClick = () => {
        setVisable(true)
    }

    const checkExtendOfUserId:(arr:ILikeAndDislike[],userId:string) => boolean = (arr, userId) => {
        return arr.some(el => el.userId === userId)
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
                        ? comments.slice(0, visibleItemsCount).map(comment =>
                            <Comment
                                commentId = {comment._id}
                                key={comment._id}
                                title={comment.title}
                                description={comment.text}
                                rating={comment.rating}
                                dislikes={comment.dislikes}
                                date={comment.date}
                                likes={comment.likes}
                                userId={comment.userId}
                                currentUser={user.id}
                                checkExtendOfUserId={checkExtendOfUserId}></Comment>)
                        : <p className={classes.emptyComments}>Комментариев ещё нет — вы можете быть первым</p>}
                </div>
                <p
                    className='text-center text-[#160F29] cursor-pointer hover:text-[#246A73]
                    text-[20px] font-semibold'
                    onClick={showMoreItems}>Показать больше комменатриев</p>
            </div>
        </>
    )
}

export default Comments