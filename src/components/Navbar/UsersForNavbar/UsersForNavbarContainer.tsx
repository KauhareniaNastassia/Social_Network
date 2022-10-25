import React from "react";

import {connect} from "react-redux";

import {Dispatch} from "redux";
import {UsersForNavbar} from "./UsersForNavbar";
import {followActionCreator, setUsersActionCreator, UserType} from "../../../redux/usersPageReducer";
import {AppStateType} from "../../../redux/redux-store";


export type mapStateToUsersForNavbarPropsType = {
    users: UserType[]
}

export type mapDispatchToUsersForNavbarPropsType = {

}

export const mapStateToUsersForNavbarProps = (state: AppStateType): mapStateToUsersForNavbarPropsType => {
    return {
        users: state.usersPage.users
    }
}


export const mapDispatchToUsersForNavbarProps = (dispatch: Dispatch): mapDispatchToUsersForNavbarPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersActionCreator(users))
        }

    }
}

export type UsersForNavbarPropsType = mapStateToUsersForNavbarPropsType & mapDispatchToUsersForNavbarPropsType
export const UsersForNavbarContainer = connect(mapStateToUsersForNavbarProps, mapDispatchToUsersForNavbarProps)(UsersForNavbar)

