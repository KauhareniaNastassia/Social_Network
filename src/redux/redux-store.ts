import {applyMiddleware, combineReducers, createStore} from "redux";
import {profilePageReducer, setStatusActionType, setUserProfileActionType} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {
    FollowActionCreatorType,
    setCurrentPageActionCreatorType, setFilterActionCreatorType,
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
import {authReducer, loginACType, setAuthUserDataACType} from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


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
    setAuthUserDataACType |
    setStatusActionType |
    setFilterActionCreatorType |
    loginACType

let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    sidebarPage: siderbarPageReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    ActionType
    >

export type AppStoreType = typeof store

