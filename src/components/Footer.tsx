import LogoNameCompany from "./LogoNameCompany"
import classes from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <>
            <footer>
                <div className={classes.footer}>
                    <div className="h-[74px] bg-white w-[2px]"></div>
                    <LogoNameCompany></LogoNameCompany>
                    <div className="h-[74px] bg-white w-[2px]"></div>
                </div>
                <div className={classes.rigthsCompany}>
                    © Mooduck 2023. All rights reserved
                </div>
            </footer>
        </>
    )
}

export default Footer