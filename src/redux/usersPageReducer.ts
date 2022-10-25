import friendFromBar1 from "../assets/img/friendFromBar1.jpg";
import friendFromBar2 from "../assets/img/friendFromBar2.jpg";
import friendFromBar3 from "../assets/img/friendFromBar3.jpg";
import {ActionType} from "./redux-store";


export type UserType = {
    id: string
    followed: boolean,
    photo: any
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}

export type initialStateUsersPageType = {
    users: UserType[]
}

let initialStateUsersPage: initialStateUsersPageType = {
    users: [
        {
            id: '1',
            followed: true,
            photo: friendFromBar1,
            fullName: 'Andrew',
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
            photo: friendFromBar2,
            fullName: 'Kate',
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
            photo: friendFromBar3,
            fullName: 'Lena',
            status: 'ololo',
            location:
                {
                    city: 'Minsk',
                    country: 'Belarus'
                }
        }
    ]
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
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }


}


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

export const followActionCreator = (userID: string): FollowActionCreatorType => {
    return {
        type: 'FOLLOW',
        userID
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