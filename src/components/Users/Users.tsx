import React from "react";
import css from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import profileAvatar from '../../assets/img/profileAvatar.svg'


/*type UsersPropsType = {
    users: UserType[]
}*/


export const Users = (props: UsersPropsType) => {

    if(props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then( res => {
                props.setUsers(res.data.items)
            })

    }

    return (
        <div className={css.usersWrapper}>
            {
                props.users.map(user =>
                    <div key={user.id}>
                    <span>
                        <div>
                            <img className={css.userPhoto} src={user.photos.small != null ? user.photos.small : profileAvatar}/>
                        </div>
                        <div>
                            {user.followed
                                ? <button onClick={() => { props.unfollow(user.id) }}> Follow </button>

                                : <button onClick={() => { props.follow(user.id) }}> Unfollow </button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                    </div>
                )
            }
        </div>
    )
}