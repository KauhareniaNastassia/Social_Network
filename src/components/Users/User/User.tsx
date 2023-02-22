import React from "react";
import css from "./User.module.scss"
import {Link} from "react-router-dom";
import profileAvatar from "../../../assets/img/profileAvatar.svg";
import {UserType} from "../../../api/usersAPI";


export const User: React.FC<UserPropsType> = ({
                                                  user,
                                                  followingProgress,
                                                  unfollowUsers,
                                                  followUsers
                                              }) => {
    return (
        <div className={css.userWrapper}>

            <div>
                <Link to={`/profile/${user.id}`}>
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
                            unfollowUsers(user.id)
                        }}
                        className={css.unfollowButton}>
                        Unfollow
                    </button>

                    : <button
                        disabled={followingProgress.some(id => id === user.id)}
                        onClick={() => {
                            followUsers(user.id)
                        }}
                        className={css.followButton}>
                        Follow
                    </button>}
            </div>

            <div>
                <span>
                    <div>{user.name}</div>
                </span>
            </div>
        </div>
    )
}

//===========TYPE================

type UserPropsType = {
    user: UserType
    followingProgress: []
    unfollowUsers: (userId: number) => void
    followUsers: (userId: number) => void
}