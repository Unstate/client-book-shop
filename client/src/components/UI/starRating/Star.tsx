import { FC } from 'react'
import starFufil from '../../../assets/starFulfil.svg'
import star from '../../../assets/starNotFulfil.svg'

interface StarProps {
    fufil: boolean
}

const Star: FC<StarProps> = ({ fufil }) => {
    return (
        <>
            {fufil
                ? <img src={starFufil}></img>
                : <img src={star}></img>}
        </>
    )
}

export default Star