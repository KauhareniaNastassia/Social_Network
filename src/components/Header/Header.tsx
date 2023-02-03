import React from "react";
import logo from '../../assets/img/logo.png'
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login:  string | null
    logoutTC: () => void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={css.header}>
            <img src={logo}/>

            <div className={css.loginBlock}>
                {props.isAuth ?
                    <div> {props.login}  -  <button onClick={props.logoutTC}>Log Out</button> </div>
                    : <NavLink to={'/login'}>
                        Login
                    </NavLink>
                }
            </div>
        </header>
    )
}