import classes from '../styles/Preloader.module.css'
import duck from '../assets/Load.svg'

const Preloader = () => {
    return (
        <>
            <div className={classes.preloaderContainer}>
                <img className={classes.duck} src={duck}/>
            </div>
        </>
    )
}

export default Preloader