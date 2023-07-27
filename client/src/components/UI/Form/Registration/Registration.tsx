import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState } from "react";
import classes from './Registration.module.css'
import email from '../../../../assets/mail.svg'
import user from '../../../../assets/userButton.svg'
import lock from '../../../../assets/lock.svg'
import see from '../../../../assets/see.svg'
import { useAppDispatch } from "../../../../hooks/redux";
import { registration } from "../../../../ReduxToolkit/actionCreators";
import ModalRegister from "../../modal/ModalRegistration/MoladRegister";


const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    correctPassword: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;


const Registration = () => {

    const [userData, setUserData] = useState({
        username: '',
        mail: '',
        password: '',
        passwordRepeat: '',
    })
    const [passwordSettings, setPasswordSettings] = useState({
        passwordVisable: true,
        passwordRepeatVisable: true,
    })
    const dispatch = useAppDispatch()
    const [visable, setVisable] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = () => ''

    const setUsername = (e: any) => {
        setUserData(prev => ({ ...prev, username: e.target.value }))
    }

    const setMail = (e: any) => {
        setUserData(prev => ({ ...prev, mail: e.target.value }))
    }

    const setPassword = (e: any) => {
        setUserData(prev => ({ ...prev, password: e.target.value }))
    }

    const setPasswordRepeat = (e: any) => {
        setUserData(prev => ({ ...prev, passwordRepeat: e.target.value }))
    }

    const clear = () => {
        setUserData(prev => ({...prev, username: '', mail: '', password: '', passwordRepeat: ''}))
    }

    const handleOnClick: (grade: number) => void = (grade) => {
        grade === 1
            ? setPasswordSettings(prev => ({ ...prev, passwordVisable: !passwordSettings.passwordVisable }))
            : setPasswordSettings(prev => ({ ...prev, passwordRepeatVisable: !passwordSettings.passwordRepeatVisable }))
    }
    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.item}>
                    <img src={user} />
                    <input
                        placeholder="nickname123"
                        {...register("username")}
                        value={userData.username}
                        onChange={setUsername} />
                    <p className="text-red-500">{errors.username?.message}</p>
                </div>
                <div className={classes.item}>
                    <img src={email} />
                    <input
                        placeholder="example@mail.ru"
                        {...register("email")}
                        value={userData.mail}
                        onChange={setMail} />
                    <p className="text-red-500">{errors.email?.message}</p>
                </div>
                <div className={classes.item}>
                    <img src={lock} />
                    {passwordSettings.passwordVisable
                        ? <input
                            placeholder="strongPsW2#"
                            {...register("password")}
                            type="password"
                            value={userData.password}
                            onChange={setPassword} />
                        : <input
                            placeholder="strongPsW2#"
                            {...register("password")}
                            type="text"
                            value={userData.password}
                            onChange={setPassword} />}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleOnClick(1)
                        }}>
                        <img src={see} />
                    </button>
                    <p className="text-red-500">{errors.password?.message}</p>
                </div>
                <div className={classes.item}>
                    <img src={lock} />
                    {passwordSettings.passwordRepeatVisable
                        ? <input
                            placeholder="Подтвердите пароль"
                            {...register("correctPassword")}
                            type="password"
                            value={userData.passwordRepeat}
                            onChange={setPasswordRepeat} />
                        : <input
                            placeholder="Подтвердите пароль"
                            {...register("correctPassword")}
                            type="text"
                            value={userData.passwordRepeat}
                            onChange={setPasswordRepeat} />}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleOnClick(2)
                        }}>
                        <img src={see} />
                    </button>
                    <p className="text-red-500">{errors.correctPassword?.message}</p>
                </div>
                <button
                    type="submit"
                    className={classes.formButton}
                    onClick={() => {
                        dispatch(registration(userData.mail, userData.username, userData.password))
                        setVisable(true)
                        clear()
                    }}>
                    Зарегестрироваться
                </button>
            </form>
            <ModalRegister
                visable={visable}
                setVisable={setVisable}>Регистрация почти завершена!</ModalRegister>
        </>
    )
}

export default Registration