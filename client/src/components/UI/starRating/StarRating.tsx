import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'
import Star from './Star'

interface StarRatingProps {
    rating: number,
    handleRating: (rating:number) => void;
}

const StarRating:FC<StarRatingProps> = ({rating, handleRating}) => {
    
    return (
        <div className='App'>
            <Rating
                tooltipDefaultText={`${rating}`}
                onClick={handleRating}
                initialValue={rating}
                emptyStyle={{ display: "flex" }}
                fillStyle={{ display: "-webkit-inline-box" }}
                transition
                tooltipArray={['1', '2', '3', '4', '5']}
                emptyIcon={<Star fufil={false}></Star>}
                fillIcon={<Star fufil={true}></Star>}/>
        </div>
    )
}

export default StarRating