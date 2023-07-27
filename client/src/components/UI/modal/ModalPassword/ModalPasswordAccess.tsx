import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ChangeEvent, FC, useState } from "react";
import classes from './ModalPasswordAccess.module.css'
import see from '../../../../assets/see.svg'
import cross from '../../../../assets/Cross.svg'
import { setNewPassword } from "../../../../ReduxToolkit/actionCreators";


const schema = yup.object({
    token: yup.string().required(),
    password: yup.string().required(),
    correctPassword: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

interface ModalPasswordProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
    id: string;
    type: boolean;
}

const ModalPasswordAccess: FC<ModalPasswordProps> = (
    {
        children,
        visable,
        setVisable,
        id,
        type,
    }) => {
    
    const [passwordSettings, setPasswordSettings] = useState({
        password: '',
        passwordRepeat:'',
        passwordVisable: false,
        passwordRepeatVisable: false,
        token: '',
    })

    const setPassword:(e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setPasswordSettings(prev => ({...prev, password: e.target.value}))
    }

    const setPasswordRepeat:(e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setPasswordSettings(prev => ({...prev, passwordRepeat: e.target.value}))
    }

    const setPasswordVisable:() => void = () => {
        setPasswordSettings(prev => ({...prev, passwordVisable: !passwordSettings.passwordVisable}))
    }

    const setPasswordRepeatVisable:() => void = () => {
        setPasswordSettings(prev => ({...prev, passwordRepeatVisable: !passwordSettings.passwordRepeatVisable}))
    }

    const setToken:(e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setPasswordSettings(prev => ({...prev, token: e.target.value}))
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <form className={classes.modalContainer} onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.modalTitle}>
                            {children}
                            <img
                                src={cross}
                                className={classes.crossImage}
                                onClick={() => setVisable(false)} />
                        </div>
                        <div className={classes.inputsContainer}>
                            {type
                                ? <div className={classes.modalInputContainer}>
                                    <input
                                        placeholder="Введите код подтверждения"
                                        className={classes.modalInput} {...register("token")}
                                        type="text" value={passwordSettings.token}
                                        onChange={setToken} />
                                </div>
                                : <></>}
                            <div className={classes.modalInputContainer}>
                                {passwordSettings.passwordVisable
                                    ? <input
                                        placeholder="Введите новый пароль"
                                        className={classes.modalInput} {...register("password")}
                                        type="password" value={passwordSettings.password}
                                        onChange={setPassword} />
                                    : <input
                                        placeholder="Введите новый пароль"
                                        className={classes.modalInput} {...register("password")}
                                        type="text" value={passwordSettings.password}
                                        onChange={setPassword} />}
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setPasswordVisable()
                                }}>
                                    <img src={see} />
                                </button>
                            </div>
                            {passwordSettings.password != passwordSettings.passwordRepeat 
                            ? <p className="text-red-500">Пароли не совпадают</p> 
                            : <></>}
                            <div className={classes.modalInputContainer}>
                                {passwordSettings.passwordRepeatVisable
                                    ? <input
                                        placeholder="Повторите новый пароль"
                                        className={classes.modalInput} {...register("correctPassword")}
                                        type="password" value={passwordSettings.passwordRepeat}
                                        onChange={setPasswordRepeat} />
                                    : <input
                                        placeholder="Повторите текущий пароль"
                                        className={classes.modalInput} {...register("correctPassword")}
                                        type="text" value={passwordSettings.passwordRepeat}
                                        onChange={setPasswordRepeat} />}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPasswordRepeatVisable()
                                    }}>
                                    <img src={see} />
                                </button>
                            </div>
                            <p className="text-red-500">
                                {errors.correctPassword?.message}
                            </p>
                        </div>
                        <button
                            className={classes.modalButton}
                            onClick={() => {
                                setNewPassword(id, passwordSettings.password)
                                setVisable(false)
                            }}>
                            Подтвердить
                        </button>
                    </form>
                </div>
                : <></>}
        </>
    );
}

export default ModalPasswordAccess