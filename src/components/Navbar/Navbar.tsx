import React from "react";
import '../../App.css';
import css from './Navbar.module.css'
import {NavLink, Route} from "react-router-dom";
import {SidebarPageContainer} from "./UsersForNavbar/SidebarPageContainer";


export const Navbar: React.FC = () => {
    return (
        <nav className={css.nav}>
            <div className={css.item}>
                <NavLink to='/profile'
                         className={({isActive}) => isActive ? css.activeLink : ''}>
                    Profile
                </NavLink>
            </div>

            <div className={css.item}>
                <NavLink to='/dialogs'
                         className={({isActive}) => isActive ? css.activeLink : ''}>
                    Messages
                </NavLink>
            </div>

            <div className={css.item}>
                <NavLink to='/users'
                         className={({isActive}) => isActive ? css.activeLink : ''}>
                    Users
                </NavLink>
            </div>

            <div className={css.item}>
                <NavLink to='/care'
                         className={({isActive}) => isActive ? css.activeLink : ''}>
                    Care
                </NavLink>
            </div>

            <div className={css.item}>
                <NavLink to='/forum'
                         className={({isActive}) => isActive ? css.activeLink : ''}>
                    Forum
                </NavLink>
            </div>


            <div>
                <SidebarPageContainer/>
            </div>
        </nav>
    )
}