import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRef, useState } from "react";
import classes from '../styles/LoginPage.module.css'
import LogoNameCompany from "../components/LogoNameCompany";
import user from '../assets/userButton.svg'
import email from '../assets/mail.svg'
import lock from '../assets/lock.svg'
import see from '../assets/see.svg'

const schema = yup.object({
    firstName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

const LoginPage = () => {

    const [password, setPassword] = useState(true)
    const [value, setValue] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div className={classes.formContainer}>
            <div className={classes.infoContainer}>
                <div className={classes.LogoNameCompanyContainer}><LogoNameCompany></LogoNameCompany></div>
                <div className={classes.questionContainer}>
                    <div className={classes.question}>еще нет аккаунта?</div>
                    <button className={classes.questionButton}>Зарегестрироваться</button>
                </div>
                <div className={classes.stick}></div>
            </div>
            <div>
                <div className={classes.formTitle}> Вход </div>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.item}>
                        <img src={email} />
                        <input placeholder="example@mail.ru" {...register("email")} />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div className={classes.item}>
                        <img src={lock} />
                        {password
                            ? <input placeholder="strongPsW2#" {...register("password")} type="password" value={value} onChange={(e) => setValue(e.target.value)} />
                            : <input placeholder="strongPsW2#" {...register("password")} type="text" value={value} onChange={(e) => setValue(e.target.value)} />}
                        <button onClick={(e) => {
                            e.preventDefault()
                            setPassword(!password)
                        }}><img src={see}/></button>
                        <p>{errors.password?.message}</p>
                    </div>
                    <div className={classes.passwordLink}>Забыли пароль?</div>
                    <button type="submit" className={classes.formButton}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage