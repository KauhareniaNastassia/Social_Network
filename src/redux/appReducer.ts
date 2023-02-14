import {ActionType, AppDispatchType} from "./redux-store";
import {getAuthUserThunkCreator} from "./authReducer";


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

export const setInitializedSuccessAC = () => ({
    type: 'app/SET-INITIALIZED',
} as const)

export const setAppErrorAC = (error: string | null) => ({
    type: 'app/SET-ERROR',
    error
} as const)


//=======THUNK======

export const initializeAppThunkCreator = () =>
    async (dispatch: AppDispatchType) => {

        try {
            let promise = dispatch(getAuthUserThunkCreator())

            Promise.all([promise])
                .then(() => {
                    dispatch(setInitializedSuccessAC())
                })
        } catch (e) {
        }
    }


//=======ACTION TYPES======

export type AppActionsType =
    | ReturnType<typeof setInitializedSuccessAC>
    | ReturnType<typeof setAppErrorAC>


//=======TYPES======

export type InitialAppStateType = {
    initialized: boolean
    error: null | string,
}



