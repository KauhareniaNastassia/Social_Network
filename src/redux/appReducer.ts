import {ActionType, AppDispatchType} from "./redux-store";
import {authAPI, LoginDataType} from "../api/api";
import {getAuthUserThunkCreator, setAuthUserDataAC} from "./authReducer";


let initialAppState: InitialAppStateType = {
    initialized: false,
    error: null as null | string,
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: ActionType): InitialAppStateType => {

    switch (action.type) {
        case 'app/SET-INITIALIZED':
            return {...state, initialized: true}

        case 'app/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}


//=======ACTIONS======

export const setInitializedSuccessAC = (): setInitializedSuccessAType => {
    return {
        type: 'app/SET-INITIALIZED',
    }
}

export const setAppErrorAC = (error: string | null): setAppErrorACType => {
    return {
        type: 'app/SET-ERROR',
        error
    }
}


//=======THUNK======

export const initializeAppThunkCreator = () => {
    return (dispatch: AppDispatchType) => {
        let promise = dispatch(getAuthUserThunkCreator())

        Promise.all([promise])
            .then(() => {
                dispatch(setInitializedSuccessAC())
            })

    }
}



//=======ACTION TYPES======

export type setInitializedSuccessAType = {
    type: 'app/SET-INITIALIZED',
}
export type setAppErrorACType = {
    type: 'app/SET-ERROR',
    error: string | null
}


//=======TYPES======

export type InitialAppStateType = {
    initialized: boolean
    error: null | string,
}



