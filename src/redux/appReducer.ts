import {ActionType, AppDispatchType} from "./redux-store";
import {authAPI, LoginDataType} from "../api/api";


let initialAppState: InitialAppStateType = {
    error: null as null | string,
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: ActionType): InitialAppStateType => {

    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}


//=======ACTIONS======

export const setAppErrorAC = (error: string | null): setAppErrorACType => {
    return {
        type: 'SET-ERROR',
        error
        }
    }



//=======THUNK======


//=======ACTION TYPES======

export type setAppErrorACType = {
    type: 'SET-ERROR',
    error: string | null
}


//=======TYPES======

export type InitialAppStateType = {
    error: null | string,
}



