import { CSSProperties, ChangeEventHandler, FC } from 'react'
import classes from './MyInput.module.css'

interface MyInputProps {
    text: string;
    type: string
    styles: CSSProperties;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const MyInput:FC<MyInputProps> = ({text,type,styles, onChange, value}) => {
    return (
        <input 
        className={classes.myInput}
        value={value}
        type={type}
        style={styles}
        placeholder={text}
        onChange={onChange}/>
    )
}

export default MyInput