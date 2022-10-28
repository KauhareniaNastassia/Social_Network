import React, {Component} from "react";
import css from './Users.module.css'
import {UsersPageClassPropsType, UsersPropsType} from "./UsersContainer";
import axios from "axios";
import profileAvatar from '../../assets/img/profileAvatar.svg'


export class UsersPageClass extends Component<UsersPageClassPropsType> {

   componentDidMount() {

       axios.get('https://social-network.samuraijs.com/api/1.0/users')
           .then(res => {
               this.props.setUsers(res.data.items)
           })

   }


    render() {
        return (
            <div className={css.usersWrapper}>
                {
                    this.props.users.map(user =>
                            <div key={user.id}>
                    <span>
                        <div>
                            <img className={css.userPhoto}
                                 src={user.photos.small != null ? user.photos.small : profileAvatar}/>
                        </div>
                        <div>
                            {user.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(user.id)
                                }}> Follow </button>

                                : <button onClick={() => {
                                    this.props.follow(user.id)
                                }}> Unfollow </button>
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
}