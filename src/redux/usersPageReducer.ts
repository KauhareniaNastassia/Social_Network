import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";

import {updateObjectInArray} from "../utils/helpers/object-helper";
import {FilterType, usersAPI, UserType} from "../api/usersAPI";
import {ResponseType} from "../api/authAPI";
import {appActions} from "./appReducer";
import {handleServerNetworkError} from "../utils/errorHandler";


let initialStateUsersPage: initialStateUsersPageType = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersPageReducer = (state: initialStateUsersPageType = initialStateUsersPage, action: ActionType): initialStateUsersPageType => {
    switch (action.type) {
        case "users/FOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case "users/UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case "users/SET-USERS": {
            return {...state, users: action.users}
        }
        case "users/SET-CURRENT-PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "users/SET-USERS-TOTAL-COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "users/TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "users/TOGGLE-IN-FOLLOWING-PROGRESS": {
            return <initialStateUsersPageType>{
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case "users/SET-FILTER": {
            return {...state, filter: action.payload}
        }
        default:
            return state
    }
}


//=======ACTIONS======

export const usersPageActions = {

    followActionCreator: (userId: number) => ({
        type: 'users/FOLLOW',
        userId,
    } as const),

    unfollowActionCreator: (userId: number) => ({
        type: 'users/UNFOLLOW',
        userId
    } as const),

    setUsersActionCreator: (users: UserType[]) => ({
        type: 'users/SET-USERS',
        users
    } as const),

    setCurrentPageActionCreator: (currentPage: number) => ({
        type: 'users/SET-CURRENT-PAGE',
        currentPage
    } as const),

    setUsersTotalCountActionCreator: (totalUsersCount: number) => ({
        type: 'users/SET-USERS-TOTAL-COUNT',
        totalUsersCount
    } as const),

    toggleIsFetchingActionCreator: (isFetching: boolean) => ({
        type: 'users/TOGGLE-IS-FETCHING',
        isFetching
    } as const),

    toggleFollowingProgressActionCreator: (isFetching: boolean, userId: number) => ({
        type: 'users/TOGGLE-IN-FOLLOWING-PROGRESS',
        isFetching,
        userId
    } as const),

    setFilterActionCreator: (filter: FilterType) => ({
        type: 'users/SET-FILTER',
        payload: filter
    } as const)
}


//=======THUNK======

/*export const getUsersThunkCreator = (params: GetUsersParamsType): AppThunkType =>
    async (dispatch) => {

        try {
            dispatch(toggleIsFetchingActionCreator(true))
            dispatch(setFilterActionCreator(params.filter))

            let data = await usersAPI.getUsers(params)
            dispatch(toggleIsFetchingActionCreator(false))
            dispatch(setUsersActionCreator(data.items))
            dispatch(setUsersTotalCountActionCreator(data.totalCount))
        } catch (e) {

        }
    }*/

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            dispatch(usersPageActions.toggleIsFetchingActionCreator(true))
            dispatch(usersPageActions.setFilterActionCreator(filter))

            let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
            dispatch(usersPageActions.setCurrentPageActionCreator(currentPage))
            dispatch(usersPageActions.toggleIsFetchingActionCreator(false))
            dispatch(usersPageActions.setUsersActionCreator(data.items))
            dispatch(usersPageActions.setUsersTotalCountActionCreator(data.totalCount))
            dispatch(appActions.setAppStatusAC('success'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }



const followUnfollowFlow = async (dispatch: AppDispatchType, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionType) => {

    dispatch(usersPageActions.toggleFollowingProgressActionCreator(true, userId))

    let res = await apiMethod(userId)

    if (res.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersPageActions.toggleFollowingProgressActionCreator(false, userId))
}

export const unFollowUsersThunkCreator = (userId: number): AppThunkType => {
    return async (dispatch: AppDispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), usersPageActions.unfollowActionCreator)
        dispatch(appActions.setAppSuccessMessageAC('User has been successfully unfollowed'))
    }
}

export const followUsersThunkCreator = (userId: number): AppThunkType => {
    return async (dispatch: AppDispatchType) => {

        await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), usersPageActions.followActionCreator)
        dispatch(appActions.setAppSuccessMessageAC('User has been successfully followed'))
    }
}


//=======ACTION TYPES======

export type UsersPageActionsType = InferActionsTypes<typeof usersPageActions>

//=======TYPES======


export type initialStateUsersPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
    filter: FilterType
}

