import {FriendFromBarType, StatePropsType} from "./store";
import friendFromBar1 from "../assets/img/friendFromBar1.jpg";
import friendFromBar2 from "../assets/img/friendFromBar2.jpg";
import friendFromBar3 from "../assets/img/friendFromBar3.jpg";
import {ActionType} from "./redux-store";


export type SidebarType = {
    friendsFromBar: FriendFromBarType[]
}
export type initialStateSidebarPageType = SidebarType

let initialStateSidebarPage: initialStateSidebarPageType = {
    friendsFromBar: [
        {
            photo: friendFromBar1,
            friendName: 'Andrew'
        },
        {
            photo: friendFromBar2,
            friendName: 'Kate'
        },
        {
            photo: friendFromBar3,
            friendName: 'Lena'
        }
    ]
}

export const sidebarPageReducer = (state:initialStateSidebarPageType = initialStateSidebarPage, action: ActionType): initialStateSidebarPageType => {


    return state
}