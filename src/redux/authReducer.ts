import {ActionType, AppDispatchType} from "./redux-store";
import {authAPI, LoginDataType} from "../api/api";
import {setAppErrorAC} from "./appReducer";


let initialState: initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: initialStateAuthType = initialState, action: ActionType): initialStateAuthType => {

    switch (action.type) {
        case "SET-USER-DATA": {
            return {
                ...state,
                ...action.data,
            };
        }
        case "LOGIN": {
            return {...state, isAuth: action.value}
        }
        default:
            return state
    }
}


//=======ACTIONS======

export const setAuthUserDataAC = (userId: null, email: null, login: null, isAuth: boolean): setAuthUserDataACType => {
    return {
        type: 'SET-USER-DATA',
        data: {
            userId,
            email,
            login,
            isAuth
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
        return authAPI.auth().then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data.login
                    dispatch(setAuthUserDataAC(id, login, email, true))
                }
            }
        )
    }
}

export const loginThunkCreator = (data: LoginDataType, setError: (error?: any) => void) => {
    return (dispatch: AppDispatchType) => {
        authAPI.login(data).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserThunkCreator())
            } else {
                dispatch(setAppErrorAC(data.data.messages[0]))
                /*setError({error: data.data.messages})*/
                /*setError({apiError: data.data.messages[0]})*/
            }

        })
    }
}

export const logoutThunkCreator = () => {
    return (dispatch: AppDispatchType) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {

                dispatch(setAuthUserDataAC(null, null, null, false))

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
        isAuth: boolean
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

export type initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: boolean
}



