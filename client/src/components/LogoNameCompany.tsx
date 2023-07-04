import classes from '../styles/LogoNameCompany.module.css'
import logotype from './../assets/logotype.svg'

const LogoNameCompany = () => {
    return (
        <div className={classes.aboutCompany}>
            <div className={classes.logoCompanyContainer}>
                <img
                    className={classes.logoCompanyImage}
                    src={logotype}/>
            </div>
            <div className={classes.nameCompany}>
                mooduck
            </div>
        </div>
    )
}

export default LogoNameCompany