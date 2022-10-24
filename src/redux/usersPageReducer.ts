import friendFromBar1 from "../assets/img/friendFromBar1.jpg";
import friendFromBar2 from "../assets/img/friendFromBar2.jpg";
import friendFromBar3 from "../assets/img/friendFromBar3.jpg";
import {ActionType} from "./redux-store";


export type UserType = {
    photo: any
    userName: string
}


export type initialStateUsersPageType = {
    users: UserType[]
}

let initialStateUsersPage: initialStateUsersPageType = {
    users: [
        {
            photo: friendFromBar1,
            userName: 'Andrew'
        },
        {
            photo: friendFromBar2,
            userName: 'Kate'
        },
        {
            photo: friendFromBar3,
            userName: 'Lena'
        }
    ]
}

export const usersPageReducer = (state:initialStateUsersPageType = initialStateUsersPage, action: ActionType): initialStateUsersPageType => {


    return state
}