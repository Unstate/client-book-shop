import classes from './FormDesctop.module.css'
import { Link } from "react-router-dom"
import { ReactElement } from 'react'
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import LogoNameCompany from '../../../LogoNameCompany';

interface IFormDesctop {
    type: any;
}

interface Iitem {
    title: string;
    buttonPlaceholder: string;
    question: string;
    buttonQuestionPlaceholder: string;
    component: ReactElement;
    linkTo: string;
}

interface IContentToRender {
    login: Iitem,
    registration: Iitem,
}

const contentToRender: IContentToRender = {
    login: {
        title: 'вход',
        buttonPlaceholder: 'Войти',
        question: 'Еще нет аккаунта?',
        buttonQuestionPlaceholder: 'Зарегистрироваться',
        component: <Login></Login>,
        linkTo: '/registration'
    },
    registration: {
        title: 'регистрация',
        buttonPlaceholder: 'Зарегистрироваться',
        question: 'Уже есть аккаунт?',
        buttonQuestionPlaceholder: 'Войти',
        component: <Registration></Registration>,
        linkTo: '/login'
    },
}

const FormDesctop: React.FC<IFormDesctop> = ({ type }) => {

    return (
        <>
            <div className={classes.infoContainer}>
                <div className={classes.LogoNameCompanyContainer}>
                    <Link to="/booksPage"><LogoNameCompany /></Link>
                </div>
                <div className={classes.questionContainer}>
                    <div className={classes.question}>
                        {contentToRender[type as keyof IContentToRender].question}
                    </div>
                    <Link to={contentToRender[type as keyof IContentToRender].linkTo}>
                        <button className={classes.questionButton}>
                            {contentToRender[type as keyof IContentToRender].buttonQuestionPlaceholder}
                        </button>
                    </Link>
                </div>
                <div className={classes.stick}></div>
            </div>
            <div className={classes.fieldContainer}>
                <p className={classes.formTitle}>
                    {contentToRender[type as keyof IContentToRender].title}
                </p>
                {contentToRender[type as keyof IContentToRender].component}
            </div>
        </>
    )
}

export default FormDesctop