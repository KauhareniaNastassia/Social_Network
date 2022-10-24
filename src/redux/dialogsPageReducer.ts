import {ActionType} from "./redux-store";


export type DialogType = {
    id: string,
    name: string
}
export type MessageType = {
    id: string,
    message: string
}

export type initialStateDialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}

let initialStateDialogsPage: initialStateDialogsPageType = {
    dialogs: [
        {id: '1', name: "Nastassia"},
        {id: '2', name: "Lena"},
        {id: '3', name: "Lesya"},
        {id: '4', name: "Olga"},
    ] as DialogType[],
    messages: [
        {id: '1', message: "Hi?"},
        {id: '2', message: "How is your cat?"},
        {id: '3', message: "Woof-woof"},
    ] as MessageType[],
    newMessageText: ''
}


export const dialogsPageReducer = (state: initialStateDialogsPageType = initialStateDialogsPage, action: ActionType): initialStateDialogsPageType => {

    switch (action.type) {
        case "SEND-MESSAGE": {
            /* action.newMessageText = state.newMessageText

             const newMessage: MessageType = {
                 id: '4',
                 message: action.newMessageText
             }
             state.messages.push(newMessage)
             state.newMessageText = ''
             return state*/

            const newMessage: MessageType = {
                id: '4',
                message: state.newMessageText
            }

            let stateCopy = {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
            return stateCopy
        }

        case "UPDATE-NEW-MESSAGE-TEXT": {
            /*state.newMessageText = action.updatedMessageText
            return state*/

            let stateCopy = {
                ...state,
                newMessageText:  action.updatedMessageText
            }
            return stateCopy

        }

        default:
            return state
    }

}


export type SendMessageActionType = {
    type: 'SEND-MESSAGE',
    /*newMessageText: string*/
}
export type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT',
    updatedMessageText: string
}


export const sendMessageAC = (): SendMessageActionType => {
    return {
        type: 'SEND-MESSAGE'
    }
}
export const updateNewMessageTextAC = (updatedMessageText: string): UpdateNewMessageTextActionType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT', updatedMessageText
    }
}
