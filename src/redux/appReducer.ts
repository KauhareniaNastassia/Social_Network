import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {authActions, getAuthUserThunkCreator} from "./authReducer";
import {authAPI, ResultCodeEnum} from "../api/authAPI";
import {handleServerNetworkError} from "../utils/errorHandler";


let initialAppState: InitialAppStateType = {
    initialized: false,
    error: null,
    successMessage: null,
    status: 'idle' as AppStatusType,
    profileId: 0 as number
}

export const appReducer = (state = initialAppState, action: ActionType): InitialAppStateType => {

    switch (action.type) {
        case 'app/SET-INITIALIZED':
            return {...state, initialized: action.value}

        case 'app/SET-ERROR':
            return {...state, error: action.error}

        case 'app/SET-SUCCESS-MESSAGE':
            return {...state, successMessage: action.successMessage}

        case 'app/SET-STATUS':
            return {...state, status: action.status}

        case 'app/SET-PROFILE-ID':
            return {...state, profileId: action.id}

        default:
            return state
    }
}


//=======ACTIONS======

export const appActions = {
    setInitializedSuccessAC: (value: boolean) => ({
        type: 'app/SET-INITIALIZED',
        value
    } as const),

    setAppErrorAC: (error: string | null) => ({
        type: 'app/SET-ERROR',
        error
    } as const),

    setAppSuccessMessageAC: (successMessage: string | null) => ({
        type: 'app/SET-SUCCESS-MESSAGE',
        successMessage
    } as const),

    setAppStatusAC: (status: AppStatusType) => ({
        type: 'app/SET-STATUS',
        status
    } as const),

    setProfileIdAC: (id: number) =>( {
        type: 'app/SET-PROFILE-ID',
        id
    } as const),
}

//=======THUNK======

export const initializeAppThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let promise = dispatch(getAuthUserThunkCreator())

            Promise.all([promise])
                .then(() => {
                    dispatch(appActions.setInitializedSuccessAC(true))
                })
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }






//=======ACTION TYPES======

export type AppActionsType = InferActionsTypes<typeof appActions>

//=======TYPES======

export type InitialAppStateType = {
    initialized: boolean
    error: string | null
    successMessage: string | null
    status: AppStatusType
    profileId: number
}

export type AppStatusType = 'idle' | 'loading' | 'success' | 'error'

export type ErrorAppType = {
    message: string
    type: 'success' | 'error'
}


