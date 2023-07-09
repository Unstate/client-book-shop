import { FC } from "react"
import classes from './CheckBox.module.css'

interface CheckBoxProps {
    checked: boolean
    info: string;
    onClick: Function;
}

const CheckBox: FC<CheckBoxProps> = ({ checked, info, onClick }) => {
    return (
        <div className="flex space-x-[10px] items-center">
            {checked
                ? <button
                    onClick={() => onClick(info)}
                    className={`${classes.button} ${classes.buttonChecked}`}></button>
                : <button
                    onClick={() => onClick(info)}
                    className={classes.button}></button>}
            <p>{info}</p>
        </div>
    )
}

export default CheckBox