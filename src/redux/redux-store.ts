import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {sidebarPageReducer} from "./sidebarPageReducer";
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

let rootReducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebarPage: sidebarPageReducer
})

export const store = createStore(rootReducers)


export type AppStateType = ReturnType<typeof rootReducers>
export type AppStoreType = typeof store