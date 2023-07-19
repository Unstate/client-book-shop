import LogoNameCompany from "./LogoNameCompany"
import classes from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div className={classes.footer}>
                <div className={classes.item}></div>
                <LogoNameCompany></LogoNameCompany>
                <div className={classes.item}></div>
            </div>
            <div className={classes.rigthsCompany}>
                © Mooduck 2023. All rights reserved
            </div>
        </footer>

    )
}

export default Footer