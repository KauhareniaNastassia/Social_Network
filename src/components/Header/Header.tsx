import React from "react";
import logo from  '../../assets/img/logo.png'
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <header className={css.header}>
            <img src={logo}/>

            <div className={css.loginBlock}>
                <NavLink to={'/login'}>Login</NavLink>
            </div>
        </header>
    )
}