import LogoNameCompany from "./LogoNameCompany"
import classes from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <>
            <footer>
                <div className={classes.footer}>
                    <LogoNameCompany></LogoNameCompany>
                </div>
                <div className={classes.rigthsCompany}>
                    © Mooduck 2023. All rights reserved
                </div>
            </footer>
        </>
    )
}

export default Footer