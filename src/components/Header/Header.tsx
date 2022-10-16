import React from "react";
import logo from  '../../assets/img/logo.png'
import css from "./Header.module.css"

export const Header = () => {
    return (
        <header className={css.header}>
            <img src={logo}/>
        </header>
    )
}