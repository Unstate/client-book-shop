import classes from './Form.module.css'
import FormDesctop from './FormDesctop/FormDesctop';
import FormMobile from './FormMobile/FormMobile';


interface IForm {
    type: string;
}

const Form: React.FC<IForm> = ({ type }) => {
    return (
        <aside className={classes.formContainer}>
                <FormDesctop type={type}/>
                <FormMobile type={type}/>
        </aside>
    )
}

export default Form