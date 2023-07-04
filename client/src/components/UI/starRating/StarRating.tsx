import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Star from './Star'

export function StarRating() {
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const handleReset = () => {
        setRating(0)
    }

    // // Optinal callback functions
    // const onPointerEnter = () => console.log('Enter')
    // const onPointerLeave = () => console.log('Leave')
    // const onPointerMove = (value: number, index: number) => console.log(value, index)

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
            {/* <button onClick={handleReset}>reset</button> */}
        </div>
    )
}

export default StarRating