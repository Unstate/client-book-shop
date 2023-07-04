import { CSSProperties, FC } from "react";
import classes from './MyButton.module.css'

interface MyButtonProps {
    children: React.ReactElement | React.ReactNode;
    onClick: () => void;
    styles: CSSProperties;
}

const MyButton:FC<MyButtonProps> = ({children, onClick, styles}) => {
    return (
        <button onClick={onClick} className={classes.myButton} style={styles}>{children}</button>
    )
}

export default MyButton