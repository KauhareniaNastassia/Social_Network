import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {usersPageReducer} from "./usersPageReducer";
import {
    AddPostActionType,
    SendMessageActionType,
    UpdateNewMessageTextActionType,
    UpdateNewPostTextActionType
} from "./store";


export type ActionType =
    AddPostActionType |
    UpdateNewPostTextActionType |
    SendMessageActionType |
    UpdateNewMessageTextActionType

let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer
})

export const store = createStore(rootReducer)


export type AppStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store