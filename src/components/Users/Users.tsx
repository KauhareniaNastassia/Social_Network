import React from "react";
import css from './Users.module.css'
import profileAvatar from '../../assets/img/profileAvatar.svg'
import {UserType} from "../../redux/usersPageReducer";
import {Link, NavLink} from "react-router-dom";


type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    unfollow: (userId: string) => void
    follow: (userId: string) => void
}


export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.min(10, Math.ceil(props.totalUsersCount / props.pageSize))

    let pages = []
    for( let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (

        <div className={css.usersWrapper}>
            <div>
                {pages.map( page => {
                    return <span
                        onClick={ (e) => {props.onPageChanged(page)} }
                        className={ props.currentPage === page ? css.selectedPage : '' }>
                            {page} </span>
                })}
            </div>

            {
                props.users.map(user =>
                    <div key={user.id}>
                            <span>
                                <div>
                                    <Link to={'/profile' + user.id}>
                                        <img className={css.userPhoto}
                                             src={user.photos.small != null
                                                 ? user.photos.small
                                                 : profileAvatar}/>
                                    </Link>

                                </div>
                                <div>
                                    {user.followed
                                        ? <button onClick={() => {
                                            props.unfollow(user.id)
                                        }}> Follow </button>

                                        : <button onClick={() => {
                                            props.follow(user.id)
                                        }}> Unfollow </button>}
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