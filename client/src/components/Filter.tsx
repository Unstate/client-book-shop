import { CSSProperties, useEffect, useState } from 'react'
import classes from '../styles/Filter.module.css'
import { IAuthor, author, genre } from '../ReduxToolkit/genreList'
import CheckBox from './UI/CheckBox/CheckBox'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'
import search from '../assets/searchButton.svg'
import { useAppDispatch } from '../hooks/redux'
import { fetchBooks, fetchBooksFilter } from '../ReduxToolkit/actionCreators'

const styles: CSSProperties = {
    width: "100%",
    padding: '10px 0'
}

const stylesInput: CSSProperties = {
    padding: '4px 0 4px 12px',
    width: '100%',
}

const Filter = () => {

    const getUniqueObjects = (arr: IAuthor[]) => {
        let uniqueArr = [];
        let seen = new Set();

        for (let obj of arr) {
            let str = JSON.stringify(obj);
            if (!seen.has(str)) {
                uniqueArr.push(obj);
                seen.add(str);
            }
        }
        return uniqueArr;
    };
    const [value, setValue] = useState('')
    const [authors, setAuthors] = useState<IAuthor[]>(getUniqueObjects(author))
    const [genres, setGenres] = useState<IAuthor[]>(getUniqueObjects(genre))
    let resultAuthors: string[] = []
    let resultGenres: string[] = []
    const dispatch = useAppDispatch()

    const filteredAuthors = (authors: IAuthor[]) => {

        const searchedAuthors = () => {
            return authors.filter(author =>
                author.author.toLowerCase().includes(value.toLowerCase()))
        }
        return searchedAuthors()
    }

    const searchedAuthors = filteredAuthors(authors)

    const handleOnClickAuthor: (id: string) => void = (id) => {
        setAuthors(searchedAuthors.map(author => author.id === id
            ? { ...author, checked: !author.checked } : author))
    }

    const handleOnClickGenre: (id: string) => void = (id) => {
        setGenres(genres.map(genre => genre.id === id
            ? { ...genre, checked: !genre.checked } : genre))
    }

    const clear: () => void = () => {
        setGenres(genres.map(genre => genre.checked
            ? { ...genre, checked: !genre.checked } : genre))
        setAuthors(searchedAuthors.map(author => author.checked
            ? { ...author, checked: !author.checked } : author))
    }

    useEffect(() => {
        searchedAuthors.map(author =>
            author.checked ? resultAuthors.push(author.author) : resultAuthors)
        genres.map(genre =>
            genre.checked ? resultGenres.push(genre.author) : resultGenres)
    }, [searchedAuthors,genres])

    return (
        <div className={classes.filterContainer}>
            <p className={classes.filterContainerText}>категории</p>
            <hr />
            <section className={classes.genreCsontainer}>
                <p className={classes.filterContainerText}>все книги</p>
                <div className={classes.genres}>
                    {genres.map((genre) => <CheckBox
                        key={genre.author}
                        checked={genre.checked}
                        info={genre.author}
                        onClick={handleOnClickGenre}></CheckBox>)}
                </div>
            </section>
            <section className={classes.authorsContainer}>
                <p className={classes.filterContainerText}>автор</p>
                <div className={classes.inputContainer}>
                    <MyInput
                        type='text'
                        text={'Имя автора'}
                        styles={stylesInput}
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <img
                        className={classes.searchButton}
                        src={search} />
                </div>
                <div className={classes.author}>
                    {searchedAuthors.map(author => <CheckBox
                        key={author.author}
                        checked={author.checked}
                        info={author.author}
                        onClick={handleOnClickAuthor}></CheckBox>)}
                </div>
            </section>
            <section className={classes.buttonsContainer}>
                <MyButton
                    styles={styles}
                    onClick={() => { dispatch(fetchBooksFilter(30, 1, resultGenres, resultAuthors)) }}>
                    применить фильтры
                </MyButton>
                <MyButton
                    styles={styles}
                    onClick={() => {
                        clear()
                        dispatch(fetchBooks(16, 1))
                    }}>
                    очистить фильтры
                </MyButton>
            </section>
        </div>
    )
}

export default Filter