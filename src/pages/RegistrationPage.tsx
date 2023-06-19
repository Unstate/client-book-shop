import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import classes from '../styles/RegistrationPage.module.css'
import LogoNameCompany from "../components/LogoNameCompany";
import user from '../assets/userButton.svg'
import email from '../assets/mail.svg'
import lock from '../assets/lock.svg'
import see from '../assets/see.svg'
import { Link } from "react-router-dom";

const schema = yup.object({
    firstName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    correctPassword: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

const RegistrationPage = () => {
    // РАЗБИТЬ ЭТОТ КОД НА КОМПОНЕНТ, ПОТОМУ ЧТО ОН ДУБЛИРУЕТСЯ
    const [password, setPassword] = useState(true)
    const [correctPassword, setCorrectPassword] = useState(true)
    const [value, setValue] = useState('')
    const [correctValue, setCorrectValue] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div className={classes.formContainer}>
            <div className={classes.infoContainer}>
                <div className={classes.LogoNameCompanyContainer}><LogoNameCompany></LogoNameCompany></div>
                <div className={classes.questionContainer}>
                    <div className={classes.question}>уже есть аккаунт?</div>
                    <Link to='/login'><button className={classes.questionButton}>Войти</button></Link>
                </div>
                <div className={classes.stick}></div>
            </div>
            <div>
                <div className={classes.formTitle}> Регистрация </div>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.item}>
                        <img src={user} />
                        <input placeholder="nickname123" {...register("firstName")} />
                        <p>{errors.firstName?.message}</p>
                    </div>
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
                    <div className={classes.item}>
                        <img src={lock} />
                        {correctPassword
                            ? <input placeholder="Подтвердите пароль" {...register("correctPassword")} type="password" value={correctValue} onChange={(e) => setCorrectValue(e.target.value)} />
                            : <input placeholder="Подтвердите пароль" {...register("correctPassword")} type="text" value={correctValue} onChange={(e) => setCorrectValue(e.target.value)} />}
                        <button onClick={(e) => {
                            e.preventDefault()
                            setCorrectPassword(!setCorrectPassword)
                        }}><img src={see}/></button>
                        <p>{errors.correctPassword?.message}</p>
                        {value !== correctValue ? <p>Пароли не совпадают!</p> : <></>}
                    </div>


                    <button type="submit" className={classes.formButton}>Зарегестрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage