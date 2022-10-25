import React from "react";
import {
    followActionCreator,
    setUsersActionCreator,
    unfollowActionCreator,
    UserType
} from "../../redux/usersPageReducer";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


export type mapStateToUsersPropsType = {
    users: UserType[]
}

export type mapDispatchToUsersPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void

}

export const mapStateToUsersProps = (state: AppStateType): mapStateToUsersPropsType => {
    return {
        users: state.usersPage.users
    }
}


export const mapDispatchToUsersProps = (dispatch: Dispatch): mapDispatchToUsersPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersActionCreator(users))
        }

    }
}

export type UsersPropsType = mapStateToUsersPropsType & mapDispatchToUsersPropsType
export const UsersContainer = connect(mapStateToUsersProps, mapDispatchToUsersProps)(Users)

