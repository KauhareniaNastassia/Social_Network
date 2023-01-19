import {ActionType, AppDispatchType} from "./redux-store";
import {authAPI} from "../api/api";


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
                isAuth: true
            };
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


//=======TYPES======

export type AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: boolean
}

type initialStateAuthType = AuthType

export type setAuthUserDataACType = {
    type: 'SET-USER-DATA',
    data: {
        userId: null,
        email: null,
        login: null,
    }
}

export type setUserDataType = {
    userId: number,
    email: string,
    login: string
}

