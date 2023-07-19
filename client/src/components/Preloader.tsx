import classes from '../styles/Preloader.module.css'
import duck from '../assets/duckWithout.svg'
import bubles from '../assets/bubblesIcon.svg'

const Preloader = () => {
    return (
        <>
            <div className={classes.preloaderContainer}>
                <img className={classes.bubles} src={bubles}/>
                <img className={classes.duck} src={duck}/>
            </div>
        </>
    )
}

export default Preloader