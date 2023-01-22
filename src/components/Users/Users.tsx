import React from "react";
import css from './Users.module.css'
import profileAvatar from '../../assets/img/profileAvatar.svg'
import {FilterType, UserType} from "../../redux/usersPageReducer";
import {Link} from "react-router-dom";
import {UsersSearchForm} from "../Forms/UsersSearchForm/UsersSearchForm";


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

    let pagesCount = Math.min(20, Math.ceil(props.totalUsersCount / props.pageSize))
    //let pagesCount =Math.ceil(props.totalUsersCount / props.pageSize) если реализовать норм пагинацию, то использовать это

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (

        <div className={css.usersWrapper}>
            <div>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            </div>
            <div>
                {pages.map(page => {
                    return <span
                        onClick={(e) => {
                            props.onPageChanged(page)
                        }}
                        className={props.currentPage === page ? css.selectedPage : ''}>
                            {page} </span>
                })}
            </div>

            <div className={css.usersBlock}>
                {
                    props.users.map(user =>
                        <div key={user.id} className={css.user}>
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
                                        ? <button disabled={props.followingProgress.some(id => id === user.id)}
                                                  onClick={() => {
                                                      props.unFollowUsersTC(user.id)
                                                      /*props.toggleFollowingProgress(true, user.id)

                                                      usersAPI.unFollowUser(user.id).then(data => {
                                                          if (data.resultCode == 0) {
                                                              props.unfollow(user.id)
                                                          }
                                                          props.toggleFollowingProgress(false, user.id)
                                                      })*/
                                                      /*axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                                          {
                                                              withCredentials: true,
                                                              headers: {
                                                                  "API-KEY": "29ceddd9-9101-4a31-9b64-db4216d3334c"
                                                              }
                                                          })
                                                          .then(res => {
                                                              if (res.data.resultCode == 0) {
                                                                  props.unfollow(user.id)
                                                              }
                                                              props.toggleFollowingProgress(false)
                                                          })*/
                                                  }}> Unfollow</button>

                                        : <button disabled={props.followingProgress.some(id => id === user.id)}
                                                  onClick={() => {
                                                      props.followUsersTC(user.id)
                                                      /*props.toggleFollowingProgress(true, user.id)

                                                      usersAPI.followUser(user.id).then(data => {
                                                          if (data.resultCode == 0) {
                                                              props.follow(user.id)
                                                          }
                                                          props.toggleFollowingProgress(false, user.id)
                                                      })*/
                                                      /*axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                                          {},
                                                          {withCredentials: true,
                                                              headers: {
                                                                  "API-KEY": "29ceddd9-9101-4a31-9b64-db4216d3334c"
                                                              }})
                                                          .then(res => {
                                                              if (res.data.resultCode == 0) {
                                                                  props.follow(user.id)
                                                              }
                                                              props.toggleFollowingProgress(false)
                                                          })*/
                                                  }}> Follow</button>}
                                </div>
                            </span>

                            <span>
                                <span>
                                    <div>{user.name}</div>
                                    <div>{user.status}</div>
                                </span>
                                {/*<span>
                                    <div>{'user.location.country'}</div>
                                    <div>{'user.location.city'}</div>
                                </span>*/}
                            </span>
                        </div>
                    )
                }
            </div>

        </div>
    )
}