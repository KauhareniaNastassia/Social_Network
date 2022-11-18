import React from "react";
import logo from '../../assets/img/logo.png'
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login:  string | null
    setAuthUserData: (userId: null, login: null, email: null) => void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={css.header}>
            <img src={logo}/>

            <div className={css.loginBlock}>
                { props.isAuth ? props.login
                    :<NavLink to={'/login'}>
                        Login
                </NavLink>
                }
            </div>
        </header>
    )
}