import { CSSProperties, FC, useEffect, useState } from 'react'
import classes from '../styles/Comments.module.css'
import ModalComment from './UI/modal/ModalComment/ModalComment'
import MyButton from './UI/button/MyButton'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getBookByIdComments } from '../ReduxToolkit/actionCreators'

interface IComments {
    id: string;
}

const Comments: FC<IComments> = ({ id }) => {

    const [visable, setVisable] = useState<boolean>(false)
    const dispatch = useAppDispatch()
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

    // console.log(comments)

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
                    visable={visable}
                    setVisable={setVisable}>Оставить комментарий</ModalComment>
            </div>
        </>
    )
}

export default Comments