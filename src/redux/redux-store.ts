import {combineReducers, createStore} from "redux";
import {profilePageReducer, setUserProfileActionType} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {
    FollowActionCreatorType,
    setCurrentPageActionCreatorType,
    SetUsersActionCreatorType,
    setUsersTotalCountActionCreatorType,
    toggleFollowingProgressActionCreatorType,
    toggleIsFetchingActionCreatorType,
    UnfollowActionCreatorType,
    usersPageReducer
} from "./usersPageReducer";
import {
    AddPostActionType,
    SendMessageActionType,
    UpdateNewMessageTextActionType,
    UpdateNewPostTextActionType
} from "./store";
import {siderbarPageReducer} from "./sidebarPageReducer";
import {authReducer, setAuthUserDataACType} from "./authReducer";


export type ActionType =
    AddPostActionType |
    UpdateNewPostTextActionType |
    SendMessageActionType |
    UpdateNewMessageTextActionType |
    FollowActionCreatorType |
    UnfollowActionCreatorType |
    SetUsersActionCreatorType |
    setCurrentPageActionCreatorType |
    setUsersTotalCountActionCreatorType |
    toggleIsFetchingActionCreatorType |
    toggleFollowingProgressActionCreatorType |
    setUserProfileActionType |
    setAuthUserDataACType

let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    sidebarPage: siderbarPageReducer,
    auth: authReducer
})

export const store = createStore(rootReducer)


export type AppStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store

