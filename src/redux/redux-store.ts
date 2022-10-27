import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {
    FollowActionCreatorType,
    SetUsersActionCreatorType,
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


export type ActionType =
    AddPostActionType |
    UpdateNewPostTextActionType |
    SendMessageActionType |
    UpdateNewMessageTextActionType |
    FollowActionCreatorType |
    UnfollowActionCreatorType |
    SetUsersActionCreatorType

let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    sidebarPage: siderbarPageReducer
})

export const store = createStore(rootReducer)


export type AppStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store

