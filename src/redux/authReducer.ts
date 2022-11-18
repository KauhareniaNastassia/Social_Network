import {PostType} from "./store";
import {ActionType} from "./redux-store";


export type AuthType = {
    userId: string | null,
    email: string | null,
    login: string | null
}
type initialStateAuthType = AuthType

let initialState: initialStateAuthType = {
    userId: null,
    email: null,
    login: null
}


export const authReducer = (state:initialStateAuthType = initialState, action: ActionType): initialStateAuthType => {

    switch (action.type) {
        case "SET-USER-DATA": {
            return {
                ...state,
                ...action.data
            };
        }

        default:
            return state
    }
}


export type setUserDataACType = {
    type: 'SET-USER-DATA',
    data: setUserDataType
}


export const setUserDataAC = (data: setUserDataType): setUserDataACType => {
    return {
        type: 'SET-USER-DATA',
        data
    }
}



export type setUserDataType = {
    userId: string,
    email: string,
    login: string
}
