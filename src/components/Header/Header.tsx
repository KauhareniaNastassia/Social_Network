import React from "react";
import logo from '../../assets/img/logo.png'
import petsville from '../../assets/img/Petsville.svg'
import css from "./Header.module.scss"
import {Navigate, NavLink,} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import {logoutThunkCreator} from "../../redux/authReducer";


export const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const login = useAppSelector((state) => state.auth.login)
    const authId = useAppSelector((state) => state.auth.authId)
    const ava = useAppSelector((state) => state.profilePage.profile?.photos?.small)
    const id = useAppSelector((state) => state.profilePage.profile?.userId)

    const onClickLogoutHandler = () => {
        dispatch(logoutThunkCreator())
    }

    return (
        <header className={css.header__wrapper}>
            <NavLink to='/'>
                <div className={css.header__logoBlock}>
                    <img src={logo} className={css.header__logo}/>
                    <img src={petsville} className={css.header__title}/>
                </div>
            </NavLink>

            <div className={css.header__loginBlock}>
                {isAuth
                    ? <div className={css.header__userBlock}>
                        <div className={css.header__userInfo}>
                            <div className={css.header__userBlock_login}>
                                {login}
                            </div>
                            <button onClick={onClickLogoutHandler} className={css.header__userBlock_logoutBTN}>Log Out</button>
                        </div>
                        <div>
                            {authId === id &&
                                <NavLink to='/profile'>
                                    <img src={ava} className={css.header_userPhoto}/>
                                </NavLink>
                                }
                        </div>
                    </div>

                    : <Navigate to={'/login'}/>
                }
            </div>
        </header>
    )
};


//===========TYPES===============
