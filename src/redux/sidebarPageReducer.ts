import friendFromBar1 from "../assets/img/friendFromBar1.jpg";
import friendFromBar2 from "../assets/img/friendFromBar2.jpg";
import friendFromBar3 from "../assets/img/friendFromBar3.jpg";
import {ActionType, AppThunkType, InferActionsTypes} from "./redux-store";
import {FilterType, usersAPI, UserType} from "../api/usersAPI";
import {usersPageActions} from "./usersPageReducer";
import {appActions} from "./appReducer";
import {handleServerNetworkError} from "../utils/errorHandler";

let initialStateSidebarPage: initialStateSidebarPageType = {
    sidebarUsers: []
}

export const siderbarPageReducer = (state: initialStateSidebarPageType = initialStateSidebarPage, action: ActionType): initialStateSidebarPageType => {
    switch (action.type) {
        case 'sidebar/SET-SIDEBAR-USERS': {
            return {...state, sidebarUsers: action.users.filter(user => user.followed === true)}
        }

        default:
            return state
    }
}


//=======ACTION ==========

export const sidebarUsersPageActions = {

    getSidebarUsers: (users: UserType[]) => ({
        type: 'sidebar/SET-SIDEBAR-USERS',
        users
    } as const)


}


//==========THUNK=============



//=======ACTION TYPES======

export type SidebarUsersPageActionsType = InferActionsTypes<typeof sidebarUsersPageActions>

//===========TYPES=========

export type SidebarUserType = {
    id: string
    followed: boolean,
    photos: any
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}

export type initialStateSidebarPageType = {
    sidebarUsers: UserType[]
}
