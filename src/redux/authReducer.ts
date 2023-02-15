import {ActionType, AppThunkType, InferActionsTypes} from "./redux-store";
import {ResultCodeEnum} from "../api/api";
import {usersPageActions} from "./usersPageReducer";
import {authAPI, LoginDataType} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";


let initialState: initialStateAuthType = {
    authId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}

export const authReducer = (state: initialStateAuthType = initialState, action: ActionType): initialStateAuthType => {

    switch (action.type) {
        case "auth/SET-USER-DATA": {
            return {
                ...state,
                ...action.data,
            };
        }
        case "auth/LOGIN": {
            return {...state, isAuth: action.value}
        }
        case "auth/GET-CAPTCHA-URL": {

            return {...state, ...action.payload}
        }
        default:
            return state
    }
}


//=======ACTIONS======

export const authActions = {

    setAuthUserDataAC: (authId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET-USER-DATA',
        data: {
            authId,
            email,
            login,
            isAuth
        }
    } as const),

    loginAC: (value: boolean) => ({
        type: 'auth/LOGIN',
        value
    } as const),

    getCaptchaURLSuccessAC: (captchaUrl: string) => ({
        type: 'auth/GET-CAPTCHA-URL',
        payload: {
            captchaUrl
        }
    } as const)


}



//=======THUNK======

export const getAuthUserThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let data = await authAPI.auth()

            if (data.resultCode === ResultCodeEnum.Success) {
                let {id, login, email} = data.data
                dispatch(authActions.setAuthUserDataAC(id, login, email, true))
            }
        } catch (e) {

        }


    }

export const loginThunkCreator = (data: LoginDataType, setError: (error?: any) => void): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await authAPI.login(data)

            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(getAuthUserThunkCreator())
            } else {
                if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
                    dispatch(getCaptchaURLThunkCreator())
                }
            }
        } catch (e) {
        }
    }


export const logoutThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await authAPI.logout()
            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(authActions.setAuthUserDataAC(null, null, null, false))
            }
        } catch (e) {
        }

    }

export const getCaptchaURLThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await securityAPI.getCaptchaUrl()
            let captchaURL = res.data.url

            dispatch(authActions.getCaptchaURLSuccessAC(captchaURL))

        } catch (e) {
        }

    }


//=======ACTION TYPES======

export type AuthActionsType = InferActionsTypes<typeof authActions>

//=======TYPES======

export type AuthType = {
    authId: null,
    email: null,
    login: null,
    isAuth: boolean,
}

export type initialStateAuthType = {
    authId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
    captcha: string | null
}



