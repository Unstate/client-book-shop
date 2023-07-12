import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import classes from '../styles/LoginPage.module.css'
import LogoNameCompany from "../components/LogoNameCompany";
import email from '../assets/mail.svg'
import lock from '../assets/lock.svg'
import see from '../assets/see.svg'
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { login } from "../ReduxToolkit/actionCreators";

const schema = yup.object({
    mail: yup.string().required(),
    password: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

const LoginPage = () => {

    const [password, setPassword] = useState(true)
    const [value, setValue] = useState('')
    const [mail, setMail] = useState('')
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div className={classes.formContainer}>
            <div className={classes.infoContainer}>
                <div className={classes.LogoNameCompanyContainer}>
                    <LogoNameCompany />
                </div>
                <div className={`${classes.fieldContainer} ${classes.fieldContainerActive}`}>
                <p className={classes.formTitle}> Вход </p>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.item}>
                        <img src={email} />
                        <input
                            placeholder="example@mail.ru"
                            {...register("mail")}
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} />
                        <p>{errors.mail?.message}</p>
                    </div>
                    <div className={classes.item}>
                        <img src={lock} />
                        {password
                            ? <input
                                placeholder="strongPsW2#"
                                {...register("password")}
                                type="password"
                                value={value}
                                onChange={(e) => setValue(e.target.value)} />
                            : <input
                                placeholder="strongPsW2#"
                                {...register("password")}
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)} />}
                        <button onClick={(e) => {
                            e.preventDefault()
                            setPassword(!password)
                        }}>
                            <img src={see} />
                        </button>
                        <p>{errors.password?.message}</p>
                    </div>
                    <div className={classes.passwordLink}>Забыли пароль?</div>
                    <button
                        className={classes.formButton}
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(login(mail, value))
                        }}>
                        Войти
                    </button>
                </form>
            </div>
                <div className={classes.questionContainer}>
                    <p className={classes.question}>
                        еще нет аккаунта?
                    </p>
                    <Link to='/registration'>
                        <button className={classes.questionButton}>
                            Зарегестрироваться
                        </button>
                    </Link>
                </div>
                <div className={classes.stick}></div>
            </div>
            <div className={classes.fieldContainer}>
                <p className={classes.formTitle}> Вход </p>
                <form className={classes.form}>
                    <div className={classes.item}>
                        <img src={email} />
                        <input
                            placeholder="example@mail.ru"
                            {...register("mail")}
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} />
                        <p>{errors.mail?.message}</p>
                    </div>
                    <div className={classes.item}>
                        <img src={lock} />
                        {password
                            ? <input
                                placeholder="strongPsW2#"
                                {...register("password")}
                                type="password"
                                value={value}
                                onChange={(e) => setValue(e.target.value)} />
                            : <input
                                placeholder="strongPsW2#"
                                {...register("password")}
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)} />}
                        <button onClick={(e) => {
                            e.preventDefault()
                            setPassword(!password)
                        }}>
                            <img src={see} />
                        </button>
                        <p>{errors.password?.message}</p>
                    </div>
                    <div className={classes.passwordLink}>Забыли пароль?</div>
                    <button
                        className={classes.formButton}
                        onClick={(e) => {
                                e.preventDefault()
                                dispatch(login(mail,value))
                                setValue('')
                                setMail('')
                            }}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage