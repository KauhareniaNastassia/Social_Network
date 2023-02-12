import React from "react";
import css from './Users.module.css'
import {FilterType, UserType} from "../../redux/usersPageReducer";
import {Pagination} from "../../common/Pagination/Pagination";
import {User} from "./User/User";


type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    onFilterChanged: (filter: FilterType) => void
    followingProgress: []
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    unFollowUsersTC: (userId: string) => void
    followUsersTC: (userId: string) => void
}


export const Users = (props: UsersPropsType) => {
    return (
        <div className={css.usersWrapper}>
            <Pagination
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                onFilterChanged={props.onFilterChanged}
            />

            <div className={css.usersBlock}>
                {props.users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                        followingProgress={props.followingProgress}
                        toggleFollowingProgress={props.toggleFollowingProgress}
                        unFollowUsersTC={props.unFollowUsersTC}
                        followUsersTC={props.followUsersTC}
                    />
                )}
            </div>
        </div>
    )
}