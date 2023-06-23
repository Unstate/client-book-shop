import { useState } from 'react'
import classes from '../styles/Filter.module.css'
import { BooksProps } from '../ReduxToolkit/bookSlice'


interface FilterProps {
    book: BooksProps
}

const Filter = () => {

    const [value, setValue] = useState('')

    return (
        <div className={classes.filterContainer}>
            <input type='text' placeholder='Имя автора' value={value} onChange={(e) => setValue(e.target.value)}></input>
        </div>
    )
}

export default Filter