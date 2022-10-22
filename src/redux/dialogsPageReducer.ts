import {DialogType, MessageType, StatePropsType} from "./store";
import {ActionType} from "./redux-store";


export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}

export type initialStateDialogsPageType = DialogsPageType

let initialStateDialogsPage:initialStateDialogsPageType = {
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
}



export const dialogsPageReducer = (state: initialStateDialogsPageType = initialStateDialogsPage, action: ActionType): initialStateDialogsPageType => {

    switch (action.type) {
        case "SEND-MESSAGE":
            action.newMessageText = state.newMessageText

            const newMessage: MessageType = {
                id: '4',
                message: action.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state

        case "UPDATE-NEW-MESSAGE-TEXT":
            state.newMessageText = action.updatedMessageText
            return  state

        default:
            return state
    }

}




export type SendMessageActionType = {
    type: 'SEND-MESSAGE',
    newMessageText: string
}
export type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT',
    updatedMessageText: string
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
