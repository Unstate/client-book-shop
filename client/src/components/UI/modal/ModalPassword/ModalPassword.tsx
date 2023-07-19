import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ChangeEvent, FC, useState } from "react";
import classes from './ModalPassword.module.css'
import see from '../../../../assets/see.svg'
import cross from '../../../../assets/Cross.svg'
import ModalPasswordAccess from "./ModalPasswordAccess";
import { checkPassword } from "../../../../ReduxToolkit/actionCreators";


const schema = yup.object({
    password: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

interface ModalPasswordProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
    userId: string;
}

const ModalPassword: FC<ModalPasswordProps> = (
    {
        children,
        visable,
        setVisable,
        userId
    }) => {

    const [passwordData, setPasswordData] = useState({
        password: '',
        passwordVisable: false,
        modalVisable: false,
    }) 
    
    const setPassword:(e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setPasswordData(prev => ({...prev, password: e.target.value}))
    }

    const setPasswordVisable:() => void = () => {
        setPasswordData(prev => ({...prev, passwordVisable: !passwordData.passwordVisable}))
    }

    const setModalVisable:(data:boolean) => void = (data) => {
        setPasswordData(prev => ({...prev, modalVisable: data}))
    }
     
    // const [password, setPassword] = useState<boolean>(false)
    // const [value, setValue] = useState<string>('')
    // const [test, setTest] = useState<boolean>(false)
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
                        <div className={classes.modalInputContainer}>
                            {passwordData.passwordVisable
                                ? <input
                                    placeholder="Введите текущий пароль"
                                    className={classes.modalInput} {...register("password")}
                                    type="password" value={passwordData.password}
                                    onChange={setPassword} />
                                : <input
                                    placeholder="Введите текущий пароль"
                                    className={classes.modalInput} {...register("password")}
                                    type="text" value={passwordData.password}
                                    onChange={setPassword} />}
                            <button onClick={(e) => {
                                e.preventDefault()
                                setPasswordVisable()
                            }}><img src={see} /></button>
                        </div>
                        <p>{errors.password?.message}</p>
                        <button
                            className={classes.modalButton}
                            onClick={() => {
                                checkPassword(userId, passwordData.password)
                                setModalVisable(true)
                                setVisable(false)
                            }}>Подтвердить</button>
                    </form>
                </div>
                : <ModalPasswordAccess
                    type={false}
                    id = {userId}
                    visable={passwordData.modalVisable}
                    setVisable={setModalVisable}>
                    Изменение пароля
                </ModalPasswordAccess>}
        </>
    );
}

export default ModalPassword