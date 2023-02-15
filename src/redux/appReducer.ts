import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserThunkCreator} from "./authReducer";


let initialAppState: InitialAppStateType = {
    initialized: false,
    error: null
}

export const appReducer = (state = initialAppState, action: ActionType): InitialAppStateType => {

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

export const appActions = {
    setInitializedSuccessAC: () => ({
        type: 'app/SET-INITIALIZED',
    } as const),

    setAppErrorAC: (error: string | null) => ({
        type: 'app/SET-ERROR',
        error
    } as const)

}




//=======THUNK======

export const initializeAppThunkCreator = (): AppThunkType =>
    async (dispatch) => {

        try {
            let promise = dispatch(getAuthUserThunkCreator())

            Promise.all([promise])
                .then(() => {
                    dispatch(appActions.setInitializedSuccessAC())
                })
        } catch (e) {
        }
    }


//=======ACTION TYPES======

export type AppActionsType = InferActionsTypes<typeof appActions>

//=======TYPES======

export type InitialAppStateType = {
    initialized: boolean
    error: null | string,
}



