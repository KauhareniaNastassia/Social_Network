import {Dispatch} from "redux";
import {appActions} from "../redux/appReducer";
import axios from "axios";
import {ResponseType} from "../api/authAPI";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ReturnType<typeof appActions.setAppErrorAC> | ReturnType<typeof appActions.setAppStatusAC>>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppErrorAC( data.messages[0]))
        }
    else {
        dispatch(appActions.setAppErrorAC('Some error occurred'))
    }
    dispatch(appActions.setAppStatusAC('error'))
}


export const handleServerNetworkError = (error: any, dispatch: Dispatch<ReturnType<typeof appActions.setAppErrorAC> | ReturnType<typeof appActions.setAppStatusAC>>) => {
    dispatch(appActions.setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(appActions.setAppStatusAC('error'))
}
