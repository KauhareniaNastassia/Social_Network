import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {authActions, getAuthUserThunkCreator} from "./authReducer";
import {authAPI, ResultCodeEnum} from "../api/authAPI";


let initialAppState: InitialAppStateType = {
    initialized: false,
    error: null,
    status: 'idle' as AppStatusType
}

export const appReducer = (state = initialAppState, action: ActionType): InitialAppStateType => {

    switch (action.type) {
        case 'app/SET-INITIALIZED':
            return {...state, initialized: action.value}

        case 'app/SET-ERROR':
            return {...state, error: action.error}

        case 'app/SET-STATUS':
            return {...state, status: action.status}

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

    setAppErrorAC: (error: ErrorAppType) => ({
        type: 'app/SET-ERROR',
        error
    } as const),

    setAppStatusAC: (status: AppStatusType) => ({
        type: 'app/SET-STATUS',
        status
    } as const),

    setProfileIdAC: (userId: number) =>( {
        type: 'app/SET-PROFILE-ID',
        userId
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
        }
    }






//=======ACTION TYPES======

export type AppActionsType = InferActionsTypes<typeof appActions>

//=======TYPES======

export type InitialAppStateType = {
    initialized: boolean
    error: ErrorAppType | null
    status: AppStatusType
}

export type AppStatusType = 'idle' | 'loading' | 'success' | 'error'

export type ErrorAppType = {
    message: string
    type: 'success' | 'error'
}


