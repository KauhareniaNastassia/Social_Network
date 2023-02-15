import {ActionType, AppThunkType} from "./redux-store";
import {setStatusAC} from "./profilePageReducer";
import {authAPI, LoginDataType, profileAPI, ResultCodeEnum, securityAPI} from "../api/api";


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

export const setAuthUserDataAC = (authId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    data: {
        authId,
        email,
        login,
        isAuth
    }
} as const)

export const loginAC = (value: boolean) => ({
    type: 'auth/LOGIN',
    value
} as const)

export const getCaptchaURLSuccessAC = (captchaUrl: string) => ({
    type: 'auth/GET-CAPTCHA-URL',
    payload: {
        captchaUrl
    }
} as const)


//=======THUNK======


export const updateStatusThunkCreator = (status: string):AppThunkType =>
    async (dispatch) => {

        try {
            let res = await profileAPI.updateStatus(status)
            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(setStatusAC(res))
            }
        } catch (e) {

        }
    }


export const getAuthUserThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let data = await authAPI.auth()

            if (data.resultCode === ResultCodeEnum.Success) {
                let {id, login, email} = data.data
                dispatch(setAuthUserDataAC(id, login, email, true))
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
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        } catch (e) {
        }

    }

export const getCaptchaURLThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await securityAPI.getCaptchaUrl()
            let captchaURL = res.data.url

            dispatch(getCaptchaURLSuccessAC(captchaURL))

        } catch (e) {
        }

    }


//=======ACTION TYPES======

export type AuthActionsType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof loginAC>
    | ReturnType<typeof getCaptchaURLSuccessAC>


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



