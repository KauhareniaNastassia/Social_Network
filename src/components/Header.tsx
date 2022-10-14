import React from "react";
import logo from '../assets/img/logo.png'
import '../App.css';

export const Header = () => {
    return (
        <header className='header'>
            <img src={logo}/>
        </header>
    )
}