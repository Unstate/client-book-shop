import { CSSProperties, FC, useEffect, useState } from 'react'
import classes from './ModalFilter.module.css'
import search from '../../../../assets/searchButton.svg'
import { IAuthor, author, genre } from '../../../../ReduxToolkit/genreList'
import { useAppDispatch } from '../../../../hooks/redux'
import CheckBox from '../../CheckBox/CheckBox'
import MyInput from '../../input/MyInput'
import MyButton from '../../button/MyButton'
import { fetchBooks, fetchBooksFilter, setBookLocation } from '../../../../ReduxToolkit/actionCreators'
import tiles from '../../../../assets/Tiles.svg'
import list from '../../../../assets/List button.svg'
import cross from '../../../../assets/Cross.svg'
import { scrollToTop } from '../../../ScrollButton'


const styles: CSSProperties = {
    width: "100%",
    padding: '10px 0'
}

const stylesInput: CSSProperties = {
    padding: '4px 0 4px 12px',
    width: '100%',
}

const stylesButton: CSSProperties = {
    padding: '13px 0',
    width: '762px',
}

const stylesButtonLittle: CSSProperties = {
    padding: '13px 0',
    width: '362px',
}

const stylesViewButton: CSSProperties = {
    border: 'none',
    width: '52px',
    height: '52px',
}

interface ModalFilterProps {
    visable: boolean;
    setVisable: Function;
}


const ModalFilter: FC<ModalFilterProps> = ({ visable, setVisable }) => {

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
    }, [searchedAuthors, genres])

    return (
        <>
            <div className={classes.modalFilterButtonContainer}>
                <div className='lg:block hidden'>
                    <MyButton
                        styles={stylesButton}
                        onClick={() => setVisable(true)}>фильтры</MyButton>
                </div>
                <div className='2xl:hidden lg:hidden block'>
                    <MyButton
                        styles={stylesButtonLittle}
                        onClick={() => setVisable(true)}>фильтры</MyButton>
                </div>
                <div className={classes.viewBooksContainer}>
                    <MyButton
                        styles={stylesViewButton}
                        onClick={() => {dispatch(setBookLocation(false))}}>
                        <img
                            className={classes.viewBooks}
                            src={tiles} />
                    </MyButton>
                    <MyButton
                        styles={stylesViewButton}
                        onClick={() => {dispatch(setBookLocation(true))}}>
                        <img
                            className={classes.viewBooks}
                            src={list} />
                    </MyButton>
                </div>
            </div>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.filterContainer}>
                        <div className={classes.modalFilterTitle}>
                            <p className={classes.filterContainerText}>категории</p>
                            <img src={cross} onClick={() => setVisable(false)} />
                        </div>
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
                                onClick={() => {
                                    if (resultGenres.length !== 0 && resultAuthors.length !== 0 ) {
                                        dispatch(fetchBooksFilter(30, 1, resultGenres, resultAuthors))
                                    } else if (resultAuthors.length === 0 && resultGenres.length !== 0) {
                                        dispatch(fetchBooksFilter(30, 1, resultGenres))
                                    } else if (resultGenres.length === 0 && resultAuthors.length!== 0) {
                                        dispatch(fetchBooksFilter(30, 1, undefined,resultAuthors))
                                    } else if (resultGenres.length === 0 && resultAuthors.length === 0) {
                                        dispatch(fetchBooksFilter(30, 1))
                                    }
                                    // dispatch(fetchBooksFilter(30, 1, resultGenres, resultAuthors))
                                    scrollToTop()
                                    setVisable(false)}}>
                                применить фильтры
                            </MyButton>
                            <MyButton
                                styles={styles}
                                onClick={() => {
                                    clear()
                                    dispatch(fetchBooks(16, 1))
                                    setVisable(false)
                                }}>
                                очистить фильтры
                            </MyButton>
                        </section>
                    </div>
                </div>
                : <></>}
        </>
    )
}

export default ModalFilter