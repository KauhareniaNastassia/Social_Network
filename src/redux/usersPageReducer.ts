import {ActionType, AppDispatchType} from "./redux-store";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helper";
import {PhotosType, UserType} from "../types/types";


let initialStateUsersPage: initialStateUsersPageType = {
    users: [],
    pageSize: 20,
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
        case "FOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        }
        case "SET-USERS": {
            return {...state, users: action.users}
        }
        case "SET-CURRENT-PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET-USERS-TOTAL-COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE-IN-FOLLOWING-PROGRESS": {
            return <initialStateUsersPageType>{
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case "SET-FILTER": {
            return {...state, filter: action.payload}
        }
        default:
            return state
    }
}


//=======ACTIONS======

export const followActionCreator = (userID: string) => ({
        type: 'FOLLOW',
        userID,
}as const)

export const unfollowActionCreator = (userID: string) => ({
        type: 'UNFOLLOW',
        userID
}as const)

export const setUsersActionCreator = (users: UserType[]) => ({
        type: 'SET-USERS',
        users
}as const)

export const setCurrentPageActionCreator = (currentPage: number) => ({
        type: 'SET-CURRENT-PAGE',
        currentPage
}as const)

export const setUsersTotalCountActionCreator = (totalUsersCount: number) => ({
        type: 'SET-USERS-TOTAL-COUNT',
        totalUsersCount
}as const)

export const toggleIsFetchingActionCreator = (isFetching: boolean) => ({
        type: 'TOGGLE-IS-FETCHING',
        isFetching
}as const)

export const toggleFollowingProgressActionCreator = (isFetching: boolean, userId: string) => ({
        type: 'TOGGLE-IN-FOLLOWING-PROGRESS',
        isFetching,
        userId
}as const)

export const setFilterActionCreator = (filter: FilterType) => ({
        type: 'SET-FILTER',
        payload: filter
}as const)

//=======THUNK======

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType) => {
    return async (dispatch: AppDispatchType) => {
        dispatch(toggleIsFetchingActionCreator(true))
        dispatch(setFilterActionCreator(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
            dispatch(toggleIsFetchingActionCreator(false))
            dispatch(setUsersActionCreator(data.items))
            dispatch(setUsersTotalCountActionCreator(data.totalCount))

    }
}

const followUnfollowFlow = async (dispatch: AppDispatchType, userId: string, apiMethod: (arg0: string) => any, actionCreator: (arg0: string) => any) => {

    dispatch(toggleFollowingProgressActionCreator(true, userId))

    let res = await apiMethod(userId)

    if (res.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressActionCreator(false, userId))
}

export const unFollowUsersThunkCreator = (userId: string) => {
    return async (dispatch: AppDispatchType) => {
        followUnfollowFlow(dispatch, userId,  usersAPI.unFollowUser.bind(usersAPI), unfollowActionCreator)
    }
}

export const followUsersThunkCreator = (userId: string) => {
    return async (dispatch: AppDispatchType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followActionCreator)
    }
}


//=======ACTION TYPES======

export type UsersPageActionsType =
    | ReturnType<typeof followActionCreator>
    | ReturnType<typeof unfollowActionCreator>
    | ReturnType<typeof setUsersActionCreator>
    | ReturnType<typeof setCurrentPageActionCreator>
    | ReturnType<typeof setUsersTotalCountActionCreator>
    | ReturnType<typeof toggleIsFetchingActionCreator>
    | ReturnType<typeof toggleFollowingProgressActionCreator>
    | ReturnType<typeof setFilterActionCreator>

//=======TYPES======



export type initialStateUsersPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
    filter: {
        term: string
        friend: null | boolean
    }
}

export type FilterType = typeof initialStateUsersPage.filter