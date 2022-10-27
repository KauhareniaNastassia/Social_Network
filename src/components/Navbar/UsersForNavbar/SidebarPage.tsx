import React from "react";
import css from './UsersForNavbar.module.css'
import {SidebarUsersPropsType} from "./SidebarPageContainer";
import {SidebarUser} from "./Friend/SidebarUser";


export const SidebarPage = (props: SidebarUsersPropsType) => {
    return (
        <div className={css.usersWrapper}>
            { props.sidebarUsers.map( user => <SidebarUser key={user.id} fullName={user.name} photo={user.photos}/> ) }

        </div>
    )
}