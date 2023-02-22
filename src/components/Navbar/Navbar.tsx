import React from "react";
import '../../App.css';
import css from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import {SidebarPage} from "./UsersForNavbar/SidebarPage";


export const Navbar: React.FC = () => {
    return (
        <nav className={css.nav__wrapper}>
            <div className={css.nav__item_block}>
                <NavLink to='/profile'
                         className={({isActive}) => isActive ? css.nav__item_activeLink : css.nav__item}>
                    Profile
                </NavLink>
            </div>

            <div className={css.nav__item_block}>
                <NavLink to='/dialogs'
                         className={({isActive}) => isActive ? css.nav__item_activeLink : css.nav__item}>
                    Messages
                </NavLink>
            </div>

            <div className={css.nav__item_block}>
                <NavLink to='/users'
                         className={({isActive}) => isActive ? css.nav__item_activeLink : css.nav__item}>
                    Users
                </NavLink>
            </div>

            <div className={css.nav__item_block}>
                <NavLink to='/care'
                         className={({isActive}) => isActive ? css.nav__item_activeLink : css.nav__item}>
                    Care
                </NavLink>
            </div>

            <div className={css.nav__item_block}>
                <NavLink to='/forum'
                         className={({isActive}) => isActive ? css.nav__item_activeLink : css.nav__item}>
                    Forum
                </NavLink>
            </div>

           {/* <div>
                <SidebarPage/>
            </div>*/}

        </nav>
    )
}