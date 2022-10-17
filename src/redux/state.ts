import friendFromBar1 from '../assets/img/friendFromBar1.jpg'
import friendFromBar2 from '../assets/img/friendFromBar2.jpg'
import friendFromBar3 from '../assets/img/friendFromBar3.jpg'


export type PostType = {
    id: string,
    message: string
    likesCount: number
}
export type DialogType = {
    id: string,
    name: string
}
export type MessageType = {
    id: string,
    message: string
}
export type FriendFromBarType = {
    photo: any
    friendName: string
}

type ProfilePageType = {
    posts: PostType[]
}
type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
}
type SidebarType = {
    friendsFromBar: FriendFromBarType[]
}

export type StatePropsType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}



let state:StatePropsType = {
    profilePage: {
        posts: [
            {
                id: '1',
                message: "Hi, how are you?",
                likesCount: 15
            },
            {
                id: '2',
                message: "It is my first post",
                likesCount: 5
            },
            {
                id: '3',
                message: "My dog is the best dog ever",
                likesCount: 7
            },
            {
                id: '4',
                message: "Such a beautiful squirrel",
                likesCount: 18
            },
        ],

    },
    dialogsPage: {
        dialogs: [
            {id: '1', name: "Nastassia"},
            {id: '2', name: "Lena"},
            {id: '3', name: "Lesya"},
            {id: '4', name: "Olga"},
        ],
        messages: [
            {id: '1', message: "Hi?"},
            {id: '2', message: "How is your cat?"},
            {id: '3', message: "Woof-woof"},
        ]
    },
    sidebar: {
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
}

export default state

