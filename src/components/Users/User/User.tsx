import React from "react";
import css from "./User.module.css"
import {Link} from "react-router-dom";
import profileAvatar from "../../../assets/img/profileAvatar.svg";
import {UserType} from "../../../api/api";



export const User = (props: UserPropsType) => {
    return (
        <div className={css.userWrapper}>
            <span>
                <div>
                    <Link to={'/profile/' + props.user.id}>
                        <img className={css.userPhoto}
                             src={props.user.photos.small != null
                                 ? props.user.photos.small
                                 : profileAvatar}/>
                    </Link>

                </div>
                <div className={css.followUnfollowButton}>
                    {props.user.followed
                        ? <button
                            disabled={props.followingProgress.some(id => id === props.user.id)}
                            onClick={() => {
                                props.unFollowUsersTC(props.user.id)
                            }}
                            className={css.unfollowButton}>
                            Unfollow
                        </button>

                        : <button
                            disabled={props.followingProgress.some(id => id === props.user.id)}
                            onClick={() => {
                                props.followUsersTC(props.user.id)
                            }}
                            className={css.followButton}>
                            Follow
                        </button>}
                    </div>
                </span>
            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
            </span>
        </div>
    )
}

//===========TYPE================

type UserPropsType = {
    user: UserType
    followingProgress: []
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    unFollowUsersTC: (userId: number) => void
    followUsersTC: (userId: number) => void
}