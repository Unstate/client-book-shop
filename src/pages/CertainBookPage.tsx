import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
// import classes from '../styles/CertainBookPage.module.css'
import { useEffect } from 'react'
import { getBookById } from '../ReduxToolkit/actionCreators'
import CertainBook from '../components/CertainBook'


const CertainBookPage = () => {

    const dispatch = useAppDispatch()
    const { book } = useAppSelector(state => state.certainBookReducer)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getBookById(id))
    },[])

    return (
        <>
            <div>
                <CertainBook
                    authors={book.authors}
                    title={book.title}
                    description={book.description}
                    genre={book.genre}
                    img={book.img}></CertainBook>
            </div>
        </>
    )
}

export default CertainBookPage