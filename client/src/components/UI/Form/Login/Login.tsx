import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState } from "react";
import classes from './Login.module.css'
import email from '../../../../assets/mail.svg'
import lock from '../../../../assets/lock.svg'
import see from '../../../../assets/see.svg'
import { useAppDispatch } from "../../../../hooks/redux";
import { login } from "../../../../ReduxToolkit/actionCreators";
import ModalName from "../../modal/ModalName/ModalName";
// import { Redirect } from "react-router-dom";


const schema = yup.object({
    mail: yup.string().required(),
    password: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

interface IUserData {
    mail: string;
    password: string;
    passwordSettings: boolean;
}

const Login = () => {

    const [userData, setUserData] = useState<IUserData>({
        mail: '',
        password: '',
        passwordSettings: true,
    })

    const [visable, setVisable] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => '';

    const setMail = (e: any) => {
        setUserData(prev => ({ ...prev, mail: e.target.value }))
    }

    const setPassword = (e: any) => {
        setUserData(prev => ({ ...prev, password: e.target.value }))
    }

    const handleOnClick: () => void = () => {
        setUserData(prev => ({ ...prev, passwordSettings: !userData.passwordSettings }))
    }

    const TestFn = (callback:Function) => {
        dispatch(login(userData.mail, userData.password))
        callback()
    }

    const myCallback = () => {
        if (localStorage.getItem('token') !== null) {
            // return <Redirect to="/" />;
            // window.location.assign('/booksPage')
            setTimeout(() => window.location.assign('/booksPage'), 1000)
          } 
    }

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.item}>
                    <img src={email} />
                    <input
                        placeholder="example@mail.ru"
                        {...register("mail")}
                        value={userData.mail}
                        onChange={setMail} />
                    <p className="text-red-500">{errors.mail?.message}</p>
                </div>
                <div className={classes.item}>
                    <img src={lock} />
                    {userData.passwordSettings
                        ? <input
                            value={userData.password}
                            placeholder="strongPsW2#"
                            {...register("password")}
                            type="password"
                            onChange={setPassword} />
                        : <input
                            placeholder="strongPsW2#"
                            {...register("password")}
                            type="text" />}
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleOnClick()
                    }}>
                        <img src={see} />
                    </button>
                    <p className="text-red-500">{errors.password?.message}</p>
                </div>
                <div className={classes.passwordLink}
                    onClick={() => setVisable(true)}>Забыли пароль?</div>
                <button
                    className={classes.formButton}
                    onClick={(e) => {
                        e.preventDefault()
                        TestFn(myCallback)
                        // dispatch(login(userData.mail, userData.password))
                    }}>
                    Войти
                </button>
            </form>
            <ModalName
                id=""
                type="reset"
                visable={visable}
                setVisable={setVisable}
                ></ModalName>
        </>
    )
}

export default Login