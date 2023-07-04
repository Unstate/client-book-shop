import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FC, useState } from "react";
import classes from './ModalPasswordAccess.module.css'
import see from '../../../../assets/see.svg'
import cross from '../../../../assets/Cross.svg'


const schema = yup.object({
    password: yup.string().required(),
    correctPassword: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

interface ModalPasswordProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
}

const ModalPasswordAccess: FC<ModalPasswordProps> = ({ children, visable, setVisable }) => {

    const [password, setPassword] = useState<boolean>(false)
    const [correctPassword, setСorrectPassword] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [correctValue, setCorrectValue] = useState<string>('')
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
                            <img src={cross} className={classes.crossImage} onClick={() => setVisable(false)}></img>
                        </div>
                        <div className={classes.inputsContainer}>
                            <div className={classes.modalInputContainer}>
                                {password
                                    ? <input placeholder="Введите текущий пароль" className={classes.modalInput} {...register("password")} type="password" value={value} onChange={(e) => setValue(e.target.value)} />
                                    : <input placeholder="Введите текущий пароль" className={classes.modalInput} {...register("password")} type="text" value={value} onChange={(e) => setValue(e.target.value)} />}
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setPassword(!password)
                                }}><img src={see} /></button>
                            </div>
                            <p>{errors.password?.message}</p>
                            {value != correctValue ? <div>Пароли не совпадают</div> : <></>}
                            <div className={classes.modalInputContainer}>
                                {correctPassword
                                    ? <input placeholder="Введите текущий пароль" className={classes.modalInput} {...register("correctPassword")} type="password" value={correctValue} onChange={(e) => setCorrectValue(e.target.value)} />
                                    : <input placeholder="Введите текущий пароль" className={classes.modalInput} {...register("correctPassword")} type="text" value={correctValue} onChange={(e) => setCorrectValue(e.target.value)} />}
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setСorrectPassword(!correctPassword)
                                }}><img src={see} /></button>
                            </div>
                            <p>{errors.correctPassword?.message}</p>
                        </div>
                        <button className={classes.modalButton} onClick={() => setVisable(false)}>Подтвердить</button>
                    </form>
                </div>
                : <></>}
        </>
    );
}

export default ModalPasswordAccess