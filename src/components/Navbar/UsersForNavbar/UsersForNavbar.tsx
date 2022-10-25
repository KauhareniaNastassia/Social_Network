import React from "react";
import css from './UsersForNavbar.module.css'
import {UserType} from "../../../redux/usersPageReducer";
import {UsersForNavbarPropsType} from "./UsersForNavbarContainer";
import {UserForNavbar} from "./User/UserForNavbar";





export const UsersForNavbar = (props: UsersForNavbarPropsType) => {
    return (
        <div className={css.usersWrapper}>
            { props.users.map( user => <UserForNavbar key={user.id} fullName={user.fullName} photo={user.photo}/> ) }

        </div>
    )
}