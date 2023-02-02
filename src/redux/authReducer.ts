import {ActionType, AppDispatchType} from "./redux-store";
import {authAPI, LoginDataType} from "../api/api";


let initialState: initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: true
}

export const authReducer = (state: initialStateAuthType = initialState, action: ActionType): initialStateAuthType => {

    switch (action.type) {
        case "SET-USER-DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        }
        case "LOGIN": {
return {... state, isAuth: action.value}
        }
        default:
            return state
    }
}


//=======ACTIONS======

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

export const loginAC = (value: boolean): loginACType => {
    return {
        type: 'LOGIN',
        value
    }
}


//=======THUNK======

export const getAuthUserThunkCreator = () => {
    return (dispatch: AppDispatchType) => {
        authAPI.auth().then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data.login
                    dispatch(setAuthUserDataAC(id, login, email))
                }
            }
        )
    }
}

export const loginThunkCreator = (data: LoginDataType) => {
    return (dispatch: AppDispatchType) => {
        authAPI.login(data).then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data.login
                dispatch(loginAC(true))
                dispatch(setAuthUserDataAC(id, login, email))
            }
        })
    }
}

//=======ACTION TYPES======

export type setAuthUserDataACType = {
    type: 'SET-USER-DATA',
    data: {
        userId: null,
        email: null,
        login: null,
    }
}

export type loginACType = {
    type: 'LOGIN',
    value: boolean
}

//=======TYPES======

export type AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: boolean
}

type initialStateAuthType = AuthType



