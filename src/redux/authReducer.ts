import {ActionType, AppDispatchType, AppThunkType} from "./redux-store";
import {authAPI, LoginDataType, profileAPI, securityAPI} from "../api/api";
import {setAppErrorAC} from "./appReducer";
import {savePhotoAC, setStatusAC} from "./profilePageReducer";


let initialState: initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
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

export const setAuthUserDataAC = (userId: null, email: null, login: null, isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    data: {
        userId,
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


export const updateStatusThunkCreator = (status: string) =>
    async (dispatch: AppDispatchType) => {

        try {
            let res = await profileAPI.updateStatus(status)
            if (res.resultCode === 0) {
                dispatch(setStatusAC(res))
            }
        } catch (e) {

        }
    }


export const getAuthUserThunkCreator = () =>
    async (dispatch: AppDispatchType) => {

        try {
            let data = await authAPI.auth()

            if (data.resultCode === 0) {
                let {id, login, email} = data.data.login
                dispatch(setAuthUserDataAC(id, login, email, true))
            }
        } catch (e) {

        }


    }

export const loginThunkCreator = (data: LoginDataType, setError: (error?: any) => void) =>
    async (dispatch: AppDispatchType) => {

        try {
            let res = await authAPI.login(data)

            if (res.resultCode === 0) {
                dispatch(getAuthUserThunkCreator())
            } else {
                if (res.resultCode === 10) {
                    dispatch(getCaptchaURLThunkCreator())
                }

                dispatch(setAppErrorAC(res.data.messages[0]))
            }
        } catch (e) {
        }
    }


export const logoutThunkCreator = () =>
    async (dispatch: AppDispatchType) => {

        try {
            let res = await authAPI.logout()
            if (res.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        } catch (e) {
        }

    }

export const getCaptchaURLThunkCreator = () =>
    async (dispatch: AppDispatchType) => {

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
    userId: null,
    email: null,
    login: null,
    isAuth: boolean,

}

export type initialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: boolean
    captcha: null
}



