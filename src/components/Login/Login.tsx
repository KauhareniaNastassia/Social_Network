import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";
import {LoginPropsType} from "./LoginContainer";
import {Redirect} from "react-router-dom";



export const Login = (props: LoginPropsType) => {

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm loginThunkCreator ={props.loginThunkCreator}
                       captchaURL={props.captchaURL}/>

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


