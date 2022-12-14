import React from "react";
import '../../App.css';
import css from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {SidebarPageContainer} from "./UsersForNavbar/SidebarPageContainer";



type NavbarPropsType = {
   /* users: UserType[]*/
}

export const Navbar = (props: NavbarPropsType) => {
    return (
        <nav className={css.nav}>
            <div className={css.item}>
                <NavLink to='/profile' activeClassName={css.activeLink}> Profile </NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/dialogs' activeClassName={css.activeLink}> Messages </NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/users' activeClassName={css.activeLink}> Users </NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/care' activeClassName={css.activeLink}> Care </NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/forum' activeClassName={css.activeLink}> Forum </NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/settings' activeClassName={css.activeLink}> Settings </NavLink>
            </div>


            <div>
                <SidebarPageContainer />
            </div>
        </nav>
    )
}