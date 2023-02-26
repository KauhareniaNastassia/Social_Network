import {ActionType, AppThunkType, InferActionsTypes} from "./redux-store";
import {authAPI, LoginDataType, ResultCodeEnum} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorHandler";
import {appActions} from "./appReducer";


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
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            const data = await authAPI.auth()

            if (data.resultCode === ResultCodeEnum.Success) {
                let {id, login, email} = data.data
                dispatch(authActions.setAuthUserDataAC(id, login, email, true))
                dispatch(appActions.setProfileIdAC(id))
                dispatch(appActions.setAppStatusAC('success'))
            } else {
                handleServerAppError(data, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }

export const loginThunkCreator = (data: LoginDataType): AppThunkType =>
    async (dispatch) => {

    dispatch(appActions.setAppStatusAC('loading'))

        try {
            let res = await authAPI.login(data)

            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(getAuthUserThunkCreator())
                dispatch(appActions.setAppStatusAC('success'))
            } else {
                handleServerAppError(res, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }


export const logoutThunkCreator = (cb?: () => void): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            let res = await authAPI.logout()
            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(authActions.setAuthUserDataAC(null, null, null, false))
                cb && cb()
                dispatch(appActions.setAppStatusAC('success'))
            } else {
                handleServerAppError(res, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }

export const getCaptchaURLThunkCreator = (): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            let res = await securityAPI.getCaptchaUrl()
            let captchaURL = res.url

            dispatch(authActions.getCaptchaURLSuccessAC(captchaURL))
            dispatch(appActions.setAppStatusAC('success'))

        } catch (e) {
            handleServerNetworkError(e, dispatch)
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



