import friendFromBar1 from "../assets/img/friendFromBar1.jpg";
import friendFromBar2 from "../assets/img/friendFromBar2.jpg";
import friendFromBar3 from "../assets/img/friendFromBar3.jpg";
import {ActionType} from "./redux-store";


export type SidebarUserType = {
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

export type initialStateSidebarPageType = {
    sidebarUsers: SidebarUserType[]
}

let initialStateSidebarPage: initialStateSidebarPageType = {
    sidebarUsers: [
        {
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
        }
    ]
}

export const siderbarPageReducer = (state: initialStateSidebarPageType = initialStateSidebarPage, action: ActionType): initialStateSidebarPageType => {

            return state
    }

