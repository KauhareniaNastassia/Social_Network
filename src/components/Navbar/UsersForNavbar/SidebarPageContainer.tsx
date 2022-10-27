import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {SidebarPage} from "./SidebarPage";
import {AppStateType} from "../../../redux/redux-store";
import {SidebarUserType} from "../../../redux/sidebarPageReducer";


export type mapStateToSidebarUsersPropsType = {
    sidebarUsers: SidebarUserType[]
}

export type mapDispatchToSidebarUsersPropsType = {

}

export const mapStateToSidebarUsersProps = (state: AppStateType): mapStateToSidebarUsersPropsType => {
    return {
        sidebarUsers: state.sidebarPage.sidebarUsers
    }
}


export const mapDispatchToSidebarUsersProps = (dispatch: Dispatch): mapDispatchToSidebarUsersPropsType => {
    return {

    }
}

export type SidebarUsersPropsType = mapStateToSidebarUsersPropsType & mapDispatchToSidebarUsersPropsType
export const SidebarPageContainer = connect(mapStateToSidebarUsersProps, mapDispatchToSidebarUsersProps)(SidebarPage)

