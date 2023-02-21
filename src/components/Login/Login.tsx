import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hoc/useAppSelector";


export const Login = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaURL = useAppSelector(state => state.auth.captcha)


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm captchaURL={captchaURL}/>

            <div>
                <div>For test use this=)</div>
                <div>
                    <span>Email</span>  <span>t53035877@gmail.com</span>
                </div>
                <div>
                    <span>Password</span>  <span>12345678</span>
                </div>
            </div>

        </div>
    );
};


