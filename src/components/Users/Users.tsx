import React from "react";
import {User} from "./FriendFromBar/User";
import css from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


/*type UsersPropsType = {
    users: UserType[]
}*/


export const Users = (props: UsersPropsType) => {
    return (
        <div className={css.usersWrapper}>
            { props.users.map( user => <User userName={user.userName} photo={user.photo}/> ) }

        </div>
    )
}