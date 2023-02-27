import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {
    ProfilePageActionType,
    profilePageReducer,
} from "./profilePageReducer";
import {
    DialogsPageActionsType,
    dialogsPageReducer,
} from "./dialogsPageReducer";
import {
    UsersPageActionsType,
    usersPageReducer
} from "./usersPageReducer";

import {SidebarUsersPageActionsType, siderbarPageReducer} from "./sidebarPageReducer";
import {
    AuthActionsType,
    authReducer,
} from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {ChatActionsType, chatReducer} from "./chatReducer";


let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    sidebarPage: siderbarPageReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

//==============TYPES==============

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends { [key: string]: (...args:any[] )=> infer U} ? U : never

export type ActionType =
    ProfilePageActionType |
    AppActionsType |
    AuthActionsType |
    DialogsPageActionsType |
    UsersPageActionsType |
    ChatActionsType |
    SidebarUsersPageActionsType

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    ActionType>

/*export type AppStoreType = typeof store*/

