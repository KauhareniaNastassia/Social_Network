import React from "react";
import css from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


/*type UsersPropsType = {
    users: UserType[]
}*/


export const Users = (props: UsersPropsType) => {
    return (
        <div className={css.usersWrapper}>
            {
                props.users.map(user =>
                    <div key={user.id}>
                    <span>
                        <div>
                            <img className={css.userPhoto} src={user.photo}/>
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
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                    </div>
                )
            }
        </div>
    )
}