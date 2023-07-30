import { CSSProperties, FC} from "react";
import StarRating from "./UI/starRating/StarRating";
import classes from '../styles/Comment.module.css'
import like from '../assets/likeButton.svg'
import dislike from '../assets/disLikeButton.svg'
import { addDislike, addLike, deleteDislike, deleteLike } from "../ReduxToolkit/actionCreators";
import { ILikeAndDislike } from "../ReduxToolkit/bookSlice";

interface CommentProps {
    title: string;
    description: string;
    rating: number;
    dislikes: ILikeAndDislike[];
    likes: ILikeAndDislike[];
    date: number;
    userId: string;
    commentId: string;
    currentUser: string;
    checkExtendOfUserId: (arr:ILikeAndDislike[],userId:string ) => boolean;
}

const Comment: FC<CommentProps> = (
    {
        checkExtendOfUserId,
        currentUser,
        commentId,
        title,
        description,
        rating,
        userId,
        date,
        likes,
        dislikes
    }) => {

    const dateN = new Date(date)
    const day = dateN.getDate().toString().padStart(2, '0');
    const month = (dateN.getMonth() + 1).toString().padStart(2, '0');
    const year = dateN.getFullYear().toString();
    const formattedDate = `${day}.${month}.${year}`;

    const red: CSSProperties = {
        background: '#F6E6DF',
    }
    const green: CSSProperties = {
        background: '#E2F4F2',
    }
    const purple: CSSProperties = {
        background: '#F3F0F9',
    }
    const black: CSSProperties = {
        background: 'black',
    }


    return (
        <article style={rating <= 2
            ? red
            : rating === 3
                ? purple
                : rating > 3
                    ? green
                    : black}
            className={classes.commentContainer}>
            <div className={classes.infoCommentContainer}>
                <p>{userId}</p>
                <p>{formattedDate}</p>
            </div>
            <div className={classes.commentBody}>
                <p className={classes.commentTitle}>{title}</p>
                <p>{description}</p>
            </div>
            <div className={classes.commentFooter}>
                <StarRating disabled={true} rating={rating} handleRating={() => { }}></StarRating>
                <div className={classes.markContainer}>
                    {checkExtendOfUserId(likes, currentUser) 
                    ? <img
                    onClick={() => deleteLike(commentId) }
                    src={like}
                    className={`${classes.button} ${classes.buttonPressed}`} />
                    : <img
                    onClick={() => addLike(commentId) }
                    src={like}
                    className={classes.button} />}
                    <p
                        className={classes.likesContainer}>{likes?.length}</p>
                    {checkExtendOfUserId(dislikes, currentUser)
                    ? <img
                    onClick={() => deleteDislike(commentId)}
                    src={dislike}
                    className={`${classes.button} ${classes.buttonPressed}`} /> 
                    : <img
                    onClick={() => addDislike(commentId)}
                    src={dislike}
                    className={classes.button} />}
                    <p>{dislikes?.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Comment