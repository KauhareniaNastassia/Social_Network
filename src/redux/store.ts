import friendFromBar1 from '../assets/img/friendFromBar1.jpg'
import friendFromBar2 from '../assets/img/friendFromBar2.jpg'
import friendFromBar3 from '../assets/img/friendFromBar3.jpg'
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {usersPageReducer} from "./usersPageReducer";

export type StoreType = {
    _state: StatePropsType
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
    _rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => StatePropsType
    dispatch: (action: ActionType) => void
}


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
export type UserType = {
    photo: any
    userName: string
}

export type ProfilePageType = {
    posts: PostType[],
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}
export type usersPageType = {
    users: UserType[]
}

export type StatePropsType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    usersPage: usersPageType
}


let store: StoreType = {
    _state: {
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
            newPostText: ''
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
            ],
            newMessageText: ''
        },
        usersPage: {
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
    },

    _rerenderEntireTree() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },

    subscribe(observer: () => void) {
        this._rerenderEntireTree = observer
    },


    dispatch(action) {

        /*this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action)
        this._state.usersPage = usersPageReducer(this._state.usersPage, action)
*/

        /*if (action.type === 'ADD-POST') {
            action.newPostText = this._state.profilePage.newPostText

            const newPost: PostType = {
                id: '5',
                message: action.newPostText,
                likesCount: 5,
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._rerenderEntireTree()
        }

        else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.updatedPostText
            this._rerenderEntireTree()
        }

        else if (action.type === 'SEND-MESSAGE') {
            action.newMessageText = this._state.dialogsPage.newMessageText

            const newMessage: MessageType = {
                id: '4',
                message: action.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._rerenderEntireTree()
        }

        else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.updatedMessageText
            this._rerenderEntireTree()
        }*/
    }
}



export type ActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | SendMessageActionType
    | UpdateNewMessageTextActionType

export type AddPostActionType = {
    type: 'ADD-POST',
    newPostText: string
}
export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    updatedPostText: string
}
export type SendMessageActionType = {
    type: 'SEND-MESSAGE',
    newMessageText: string
}
export type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT',
    updatedMessageText: string
}



export const addPostAC = (newPostText: string): AddPostActionType => {
    return {
        type: 'ADD-POST', newPostText
    }
}
export const updateNewPostTextAC = (updatedPostText: string): UpdateNewPostTextActionType => {
    return {
        type: 'UPDATE-NEW-POST-TEXT', updatedPostText
    }
}
export const sendMessageAC = (newMessageText: string): SendMessageActionType => {
    return {
        type: 'SEND-MESSAGE', newMessageText
    }
}
export const updateNewMessageTextAC = (updatedMessageText: string): UpdateNewMessageTextActionType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT', updatedMessageText
    }
}










export default store


