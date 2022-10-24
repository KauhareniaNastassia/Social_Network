import React from "react";
import {UserType} from "../../redux/usersPageReducer";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


export type mapStateToUsersPropsType = {
    users: UserType[]
}

export type mapDispatchToUsersPropsType = {

}

export const mapStateToUsersProps = (state: AppStateType): mapStateToUsersPropsType => {
    return {
        users: state.usersPage.users
    }
}


export const mapDispatchToUsersProps = (dispatch: Dispatch): mapDispatchToUsersPropsType => {
    return {

    }
}

export type UsersPropsType = mapStateToUsersPropsType & mapDispatchToUsersPropsType
export const UsersContainer = connect(mapStateToUsersProps, mapDispatchToUsersProps)(Users)

