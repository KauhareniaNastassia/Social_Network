import {ActionType} from "./redux-store";


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
            let stateCopy = {
                ...state,
                newMessageText: action.updatedMessageText
            }
            return stateCopy
        }

        default:
            return state
    }

}

//===========ACTIONS=========

export const sendMessageAC = () => ({
    type: 'SEND-MESSAGE'
} as const)

export const updateNewMessageTextAC = (updatedMessageText: string) => ({
        type: 'UPDATE-NEW-MESSAGE-TEXT', updatedMessageText
}as const)

//===========ACTION TYPES=========

export type DialogsPageActionsType =
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>


//===========TYPES=========

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