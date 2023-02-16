import React from "react";
import css from "./User.module.css"
import {Link} from "react-router-dom";
import profileAvatar from "../../../assets/img/profileAvatar.svg";
import {UserType} from "../../../api/usersAPI";




export const User: React.FC<UserPropsType> = ({
                                                  user,
                                                  followingProgress,
                                                  toggleFollowingProgress,
                                                  unFollowUsersTC,
                                                  followUsersTC
                                              }) => {
    return (
        <div className={css.userWrapper}>
            <span>
                <div>
                    <Link to={'/profile/' + user.id}>
                        <img className={css.userPhoto}
                             src={user.photos.small != null
                                 ? user.photos.small
                                 : profileAvatar}/>
                    </Link>

                </div>
                <div className={css.followUnfollowButton}>
                    {user.followed
                        ? <button
                            disabled={followingProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollowUsersTC(user.id)
                            }}
                            className={css.unfollowButton}>
                            Unfollow
                        </button>

                        : <button
                            disabled={followingProgress.some(id => id === user.id)}
                            onClick={() => {
                                followUsersTC(user.id)
                            }}
                            className={css.followButton}>
                            Follow
                        </button>}
                    </div>
                </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
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