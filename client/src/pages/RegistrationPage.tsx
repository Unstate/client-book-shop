// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import { useState } from "react";
// import classes from '../styles/RegistrationPage.module.css'
// import LogoNameCompany from "../components/LogoNameCompany";
// import user from '../assets/userButton.svg'
// import email from '../assets/mail.svg'
// import lock from '../assets/lock.svg'
// import see from '../assets/see.svg'
// import { Link } from "react-router-dom";
// import { useAppDispatch } from "../hooks/redux";
// import { registration } from "../ReduxToolkit/actionCreators";
// import ModalRegister from "../components/UI/modal/ModalRegistration/MoladRegister";

import Form from "../components/UI/Form/Form";


// const schema = yup.object({
//     username: yup.string().required(),
//     email: yup.string().required(),
//     password: yup.string().required(),
//     correctPassword: yup.string().required(),
// }).required();
// type FormData = yup.InferType<typeof schema>;

const RegistrationPage = () => {

    // const [userData, setUserData] = useState({
    //     username: '',
    //     mail: '',
    //     password: '',
    //     passwordRepeat: '',
    // })
    // const [passwordSettings, setPasswordSettings] = useState({
    //     passwordVisable: true,
    //     passwordRepeatVisable: true,
    // })
    // const dispatch = useAppDispatch()
    // const [visable, setVisable] = useState<boolean>(false)
    // const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    //     resolver: yupResolver(schema)
    // });
    // const onSubmit = (data: FormData) => ''

    // const setUsername = (e: any) => {
    //     setUserData(prev => ({ ...prev, username: e.target.value }))
    // }

    // const setMail = (e: any) => {
    //     setUserData(prev => ({ ...prev, mail: e.target.value }))
    // }

    // const setPassword = (e: any) => {
    //     setUserData(prev => ({ ...prev, password: e.target.value }))
    // }

    // const setPasswordRepeat = (e: any) => {
    //     setUserData(prev => ({ ...prev, passwordRepeat: e.target.value }))
    // }

    // const handleOnClick: (grade: number) => void = (grade) => {
    //     grade === 1
    //         ? setPasswordSettings(prev => ({ ...prev, passwordVisable: !passwordSettings.passwordVisable }))
    //         : setPasswordSettings(prev => ({ ...prev, passwordRepeatVisable: !passwordSettings.passwordRepeatVisable }))
    // }

    return (
        <Form type="registration"></Form>
        // <aside className={classes.formContainer}>
        //     <div className={classes.infoContainer}>
        //         <div className={classes.LogoNameCompanyContainer}>
        //             <Link to="/booksPage"><LogoNameCompany /></Link>
        //         </div>
        //         <div className={`${classes.fieldContainer} ${classes.fieldContainerActive}`}>
        //             <p className={classes.formTitle}> Регистрация </p>
        //             <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        //                 <div className={classes.item}>
        //                     <img src={user} />
        //                     <input
        //                         placeholder="nickname123"
        //                         {...register("username")}
        //                         value={userData.username}
        //                         onChange={setUsername} />
        //                     <p>{errors.username?.message}</p>
        //                 </div>
        //                 <div className={classes.item}>
        //                     <img src={email} />
        //                     <input
        //                         placeholder="example@mail.ru"
        //                         {...register("email")}
        //                         value={userData.mail}
        //                         onChange={setMail} />
        //                     <p>{errors.email?.message}</p>
        //                 </div>
        //                 <div className={classes.item}>
        //                     <img src={lock} />
        //                     {passwordSettings.passwordVisable
        //                         ? <input
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="password"
        //                             value={userData.password}
        //                             onChange={setPassword} />
        //                         : <input
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="text"
        //                             value={userData.password}
        //                             onChange={setPassword} />}
        //                     <button
        //                         onClick={(e) => {
        //                             e.preventDefault()
        //                             handleOnClick(1)
        //                         }}>
        //                         <img src={see} />
        //                     </button>
        //                     <p>{errors.password?.message}</p>
        //                 </div>
        //                 <div className={classes.item}>
        //                     <img src={lock} />
        //                     {passwordSettings.passwordRepeatVisable
        //                         ? <input
        //                             placeholder="Подтвердите пароль"
        //                             {...register("correctPassword")}
        //                             type="password"
        //                             value={userData.passwordRepeat}
        //                             onChange={setPasswordRepeat} />
        //                         : <input
        //                             placeholder="Подтвердите пароль"
        //                             {...register("correctPassword")}
        //                             type="text"
        //                             value={userData.passwordRepeat}
        //                             onChange={setPasswordRepeat} />}
        //                     <button
        //                         name="passwordRepeatVisable"
        //                         onClick={(e) => {
        //                             e.preventDefault()
        //                             handleOnClick(2)
        //                         }}>
        //                         <img src={see} />
        //                     </button>
        //                     <p>{errors.correctPassword?.message}</p>
        //                 </div>
        //                 <button
        //                     type="submit"
        //                     className={classes.formButton}
        //                     onClick={() => {
        //                         dispatch(registration(userData.mail, userData.username, userData.password))
        //                         setVisable(true)
        //                     }}>
        //                     Зарегестрироваться
        //                 </button>
        //             </form>
        //         </div>
        //         <div className={classes.questionContainer}>
        //             <div className={classes.question}>уже есть аккаунт?</div>
        //             <Link to='/login'>
        //                 <button className={classes.questionButton}>
        //                     Войти
        //                 </button>
        //             </Link>
        //         </div>
        //         <div className={classes.stick}></div>
        //     </div>
        //     <div className={classes.fieldContainer}>
        //         <p className={classes.formTitle}> Регистрация </p>
        //         <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        //             <div className={classes.item}>
        //                 <img src={user} />
        //                 <input
        //                     placeholder="nickname123"
        //                     {...register("username")}
        //                     value={userData.username}
        //                     onChange={setUsername} />
        //                 <p>{errors.username?.message}</p>
        //             </div>
        //             <div className={classes.item}>
        //                 <img src={email} />
        //                 <input
        //                     placeholder="example@mail.ru"
        //                     {...register("email")}
        //                     value={userData.mail}
        //                     onChange={setMail} />
        //                 <p>{errors.email?.message}</p>
        //             </div>
        //             <div className={classes.item}>
        //                 <img src={lock} />
        //                 {passwordSettings.passwordVisable
        //                     ? <input
        //                         placeholder="strongPsW2#"
        //                         {...register("password")}
        //                         type="password"
        //                         value={userData.password}
        //                         onChange={setPassword} />
        //                     : <input
        //                         placeholder="strongPsW2#"
        //                         {...register("password")}
        //                         type="text"
        //                         value={userData.password}
        //                         onChange={setPassword} />}
        //                 <button
        //                     onClick={(e) => {
        //                         e.preventDefault()
        //                         handleOnClick(1)
        //                     }}>
        //                     <img src={see} />
        //                 </button>
        //                 <p>{errors.password?.message}</p>
        //             </div>
        //             <div className={classes.item}>
        //                 <img src={lock} />
        //                 {passwordSettings.passwordRepeatVisable
        //                     ? <input
        //                         placeholder="Подтвердите пароль"
        //                         {...register("correctPassword")}
        //                         type="password"
        //                         value={userData.passwordRepeat}
        //                         onChange={setPasswordRepeat} />
        //                     : <input
        //                         placeholder="Подтвердите пароль"
        //                         {...register("correctPassword")}
        //                         type="text"
        //                         value={userData.passwordRepeat}
        //                         onChange={setPasswordRepeat} />}
        //                 <button
        //                     name="passwordRepeatVisable"
        //                     onClick={(e) => {
        //                         e.preventDefault()
        //                         handleOnClick(2)
        //                     }}>
        //                     <img src={see} />
        //                 </button>
        //                 <p>{errors.correctPassword?.message}</p>
        //             </div>
        //             <button
        //                 type="submit"
        //                 className={classes.formButton}
        //                 onClick={() => {
        //                     dispatch(registration(userData.mail, userData.username, userData.password))
        //                     setVisable(true)
        //                 }}>
        //                 Зарегестрироваться
        //             </button>
        //         </form>
        //     </div>
        //     <ModalRegister
        //         visable={visable}
        //         setVisable={setVisable}>Регистрация почти завершена!</ModalRegister>
        // </aside>
    );
}

export default RegistrationPage