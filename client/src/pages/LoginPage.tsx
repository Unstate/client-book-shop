// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import { useState } from "react";
// import classes from '../styles/LoginPage.module.css'
// import LogoNameCompany from "../components/LogoNameCompany";
// import email from '../assets/mail.svg'
// import lock from '../assets/lock.svg'
// import see from '../assets/see.svg'
// import { Link } from "react-router-dom";
// import { useAppDispatch } from "../hooks/redux";
// import { login } from "../ReduxToolkit/actionCreators";
import Form from "../components/UI/Form/Form";

// interface IUserData {
//     mail:string;
//     password: string;
//     passwordSettings: boolean;
// }

// const schema = yup.object({
//     mail: yup.string().required(),
//     password: yup.string().required(),
// }).required();
// type FormData = yup.InferType<typeof schema>;

const LoginPage = () => {

    // const [userData,setUserData] = useState<IUserData>({
    //     mail:'',
    //     password:'',
    //     passwordSettings: true,
    // })
    // const dispatch = useAppDispatch()
    // const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    //     resolver: yupResolver(schema)
    // });

    // const onSubmit = () => '';

    // const setMail = (e:any) => {
    //     setUserData(prev => ({...prev, mail: e.target.value}))
    // }

    // const setPassword = (e:any) => {
    //     setUserData(prev => ({...prev, password: e.target.value}))
    // }

    // const handleOnClick: () => void = () => {
    //     setUserData(prev => ({...prev, passwordSettings: !userData.passwordSettings}))
    // }

    return (
        <Form type="login"></Form>
        // <div className={classes.formContainer}>
        //     <div className={classes.infoContainer}>
        //         <div className={classes.LogoNameCompanyContainer}>
        //             <Link to="/booksPage"><LogoNameCompany /></Link>
        //         </div>
        //         <div className={`${classes.fieldContainer} ${classes.fieldContainerActive}`}>
        //             <p className={classes.formTitle}> Вход </p>
        //             <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        //                 <div className={classes.item}>
        //                     <img src={email} />
        //                     <input
        //                         placeholder="example@mail.ru"
        //                         {...register("mail")}
        //                         value={userData.mail}
        //                         onChange={setMail}/> 
        //                     <p>{errors.mail?.message}</p>
        //                 </div>
        //                 <div className={classes.item}>
        //                     <img src={lock} />
        //                     <img src={lock} />
        //                     {userData.passwordSettings
        //                         ? <input
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="password"
        //                             value={userData.password}
        //                             onChange={setPassword}/>
        //                         : <input
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="text"
        //                             value={userData.password}
        //                             onChange={setPassword}/>}
        //                     <button
        //                         onClick={(e) => {
        //                             e.preventDefault()
        //                             handleOnClick()
        //                         }}>
        //                         <img src={see} />
        //                     </button>
        //                     <p>{errors.password?.message}</p>
        //                 </div>
        //                 <div className={classes.passwordLink}>Забыли пароль?</div>
        //                 <button
        //                     className={classes.formButton}
        //                     onClick={(e) => {
        //                         e.preventDefault()
        //                         dispatch(login(userData.mail,userData.password ))
        //                     }}>
        //                     Войти
        //                 </button>
        //             </form>
        //         </div>
        //         <div className={classes.questionContainer}>
        //             <p className={classes.question}>
        //                 еще нет аккаунта?
        //             </p>
        //             <Link to='/registration'>
        //                 <button className={classes.questionButton}>
        //                     Зарегестрироваться
        //                 </button>
        //             </Link>
        //         </div>
        //         <div className={classes.stick}></div>
        //     </div>
        //     <div className={classes.fieldContainer}>
        //         <p className={classes.formTitle}> Вход </p>
        //         <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        //                 <div className={classes.item}>
        //                     <img src={email} />
        //                     <input
        //                         placeholder="example@mail.ru"
        //                         {...register("mail")}
        //                         value={userData.mail}
        //                         onChange={setMail}/> 
        //                     <p>{errors.mail?.message}</p>
        //                 </div>
        //                 <div className={classes.item}>
        //                     <img src={lock} />
        //                     {userData.passwordSettings
        //                         ? <input
        //                             value={userData.password}
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="password"
        //                             onChange={setPassword}/>
        //                         : <input
        //                             placeholder="strongPsW2#"
        //                             {...register("password")}
        //                             type="text"/>}
        //                     <button onClick={(e) => {
        //                         e.preventDefault()
        //                         handleOnClick()
        //                     }}>
        //                         <img src={see} />
        //                     </button>
        //                     <p>{errors.password?.message}</p>
        //                 </div>
        //                 <div className={classes.passwordLink}>Забыли пароль?</div>
        //                 <button
        //                     className={classes.formButton}
        //                     onClick={(e) => {
        //                         e.preventDefault()
        //                         dispatch(login(userData.mail,userData.password ))
        //                     }}>
        //                     Войти
        //                 </button>
        //             </form>
        //     </div>
        // </div>
    )
}

export default LoginPage