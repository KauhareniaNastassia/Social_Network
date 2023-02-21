import React from "react";
import logo from '../../assets/img/logo.png'
import css from "./Header.module.css"
import {Navigate,} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import {logoutThunkCreator} from "../../redux/authReducer";


export const Header:React.FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const login = useAppSelector((state) => state.auth.login)

    const onClickLogoutHandler = () => {
        dispatch(logoutThunkCreator)
    }

    return (
        <header className={css.header}>
            <img src={logo}/>

            <div className={css.loginBlock}>
                {isAuth
                    ? <div> {login} - <button onClick={onClickLogoutHandler}>Log Out</button></div>
                    : <Navigate  to ={'/login'}/>
                }
            </div>
        </header>
    )
};



//===========TYPES===============
