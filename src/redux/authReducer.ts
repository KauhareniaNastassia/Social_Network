import {PostType} from "./store";
import {ActionType} from "./redux-store";


export type AuthType = {
    userId: null,
    email: null,
    login:  null,
    isAuth: boolean
}
type initialStateAuthType = AuthType

let initialState: initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


export const authReducer = (state:initialStateAuthType = initialState, action: ActionType): initialStateAuthType => {

    switch (action.type) {
        case "SET-USER-DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        }

        default:
            return state
    }
}


export type setAuthUserDataACType = {
    type: 'SET-USER-DATA',
    data: {
        userId: null,
        email: null,
        login:  null,
    }
}


export const setAuthUserDataAC = (userId: null, email: null, login: null): setAuthUserDataACType => {
    return {
        type: 'SET-USER-DATA',
        data: {
            userId,
            email,
            login
        }
    }
}



export type setUserDataType = {
    userId: number,
    email: string,
    login: string
}
