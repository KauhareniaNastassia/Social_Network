import React from "react";
import logo from '../../assets/img/logo.png'
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";


export const Header:React.FC<HeaderPropsType> = ({
                                                     isAuth,
                                                     login,
                                                     logoutTC
                                                 }) => {

    return (
        <header className={css.header}>
            <img src={logo}/>

            <div className={css.loginBlock}>
                {isAuth ?
                    <div> {login} - <button onClick={logoutTC}>Log Out</button></div>
                    : <NavLink to={'/login'}>
                        Login
                    </NavLink>
                }
            </div>
        </header>
    )
};



//===========TYPES===============

type HeaderPropsType = {
    isAuth: boolean
    login:  string | null
    logoutTC: () => void
}