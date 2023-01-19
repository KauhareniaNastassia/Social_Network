import {ActionType, AppDispatchType} from "./redux-store";
import {usersAPI} from "../api/api";


let initialStateUsersPage: initialStateUsersPageType = {
    users: [
        /*{
            id: '1',
            followed: true,
            photos: friendFromBar1,
            name: 'Andrew',
            status: 'ololo',
            location:
                {
                    city: 'Minsk',
                    country: 'Belarus'
                }
        },
        {
            id: '2',
            followed: true,
            photos: friendFromBar2,
            name: 'Kate',
            status: 'ololo',
            location:
                {
                    city: 'Minsk',
                    country: 'Belarus'
                }
        },
        {
            id: '3',
            followed: false,
            photos: friendFromBar3,
            name: 'Lena',
            status: 'ololo',
            location:
                {
                    city: 'Minsk',
                    country: 'Belarus'
                }
        }*/
    ],
    pageSize: 20,
    totalUsersCount: 55,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersPageReducer = (state: initialStateUsersPageType = initialStateUsersPage, action: ActionType): initialStateUsersPageType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        }
        case "UNFOLLOW": {
            /*return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: false} : user)
            }*/
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: false}
                    }
                    return user
                })
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
        default:
            return state
    }
}


//=======ACTIONS======

export const followActionCreator = (userID: string): FollowActionCreatorType => {
    return {
        type: 'FOLLOW',
        userID,
    }
}

export const unfollowActionCreator = (userID: string): UnfollowActionCreatorType => {
    return {
        type: 'UNFOLLOW',
        userID
    }
}

export const setUsersActionCreator = (users: UserType[]): SetUsersActionCreatorType => {
    return {
        type: 'SET-USERS',
        users
    }
}

export const setCurrentPageActionCreator = (currentPage: number): setCurrentPageActionCreatorType => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    }
}

export const setUsersTotalCountActionCreator = (totalUsersCount: number): setUsersTotalCountActionCreatorType => {
    return {
        type: 'SET-USERS-TOTAL-COUNT',
        totalUsersCount
    }
}

export const toggleIsFetchingActionCreator = (isFetching: boolean): toggleIsFetchingActionCreatorType => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    }
}

export const toggleFollowingProgressActionCreator = (isFetching: boolean, userId: string): toggleFollowingProgressActionCreatorType => {
    return {
        type: 'TOGGLE-IN-FOLLOWING-PROGRESS',
        isFetching,
        userId
    }
}

//=======THUNK======

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: AppDispatchType) => {
        dispatch(toggleIsFetchingActionCreator(true))

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingActionCreator(false))
            dispatch(setUsersActionCreator(data.items))
            dispatch(setUsersTotalCountActionCreator(data.totalCount))
        })
    }
}

export const unFollowUsersThunkCreator = (userId: string) => {
    return (dispatch: AppDispatchType) => {
        dispatch(toggleFollowingProgressActionCreator(true, userId))

        usersAPI.unFollowUser(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollowActionCreator(userId))
            }
            dispatch(toggleFollowingProgressActionCreator(false, userId))
        })
    }
}

export const followUsersThunkCreator = (userId: string) => {
    return (dispatch: AppDispatchType) => {
        dispatch(toggleFollowingProgressActionCreator(true, userId))

        usersAPI.followUser(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(followActionCreator(userId))
            }
            dispatch(toggleFollowingProgressActionCreator(false, userId))
        })
    }
}


//=======ACTION TYPES======

export type FollowActionCreatorType = {
    type: 'FOLLOW',
    userID: string
}
export type UnfollowActionCreatorType = {
    type: 'UNFOLLOW',
    userID: string
}

export type SetUsersActionCreatorType = {
    type: 'SET-USERS',
    users: UserType[]
}

export type setCurrentPageActionCreatorType = {
    type: 'SET-CURRENT-PAGE',
    currentPage: number
}
export type setUsersTotalCountActionCreatorType = {
    type: 'SET-USERS-TOTAL-COUNT',
    totalUsersCount: number
}
export type toggleIsFetchingActionCreatorType = {
    type: 'TOGGLE-IS-FETCHING',
    isFetching: boolean
}
export type toggleFollowingProgressActionCreatorType = {
    type: 'TOGGLE-IN-FOLLOWING-PROGRESS',
    isFetching: boolean,
    userId: string
}


//=======TYPES======

export type UserType = {
    id: string
    followed: boolean,
    photos: any
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}

export type initialStateUsersPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}