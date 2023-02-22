import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hoc/useAppSelector";
import bigLogo from '../../assets/img/bigLogo.svg'
import css from './Login.module.scss'


export const Login = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaURL = useAppSelector(state => state.auth.captcha)


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={css.wrapper}>
            <div className={css.wrapper__logo}>
                <img src={bigLogo} alt='logo' className={css.wrapper__logo_img}/>
                <div className={css.wrapper__logo_desc}>
                    Join now and tell the world about your pet
                </div>
            </div>

            <div className={css.wrapper__login}>
                <h1 className={css.wrapper__login_title}>LOGIN</h1>
                <LoginForm captchaURL={captchaURL}/>

                <div className={css.wrapper__login_test}>
                    <div className={css.wrapper__login_test_title}>For test use this=)</div>
                    <div className={css.wrapper__login_test_block}>
                        <div className={css.wrapper__login_test_block_title}>Email:</div>  <span className={css.wrapper__login_test_block_descr}>t53035877@gmail.com</span>
                    </div>
                    <div className={css.wrapper__login_test_block}>
                        <div className={css.wrapper__login_test_block_title}>Password:</div>  <span className={css.wrapper__login_test_block_descr}>12345678</span>
                    </div>
                </div>

            </div>
        </div>



    );
};


