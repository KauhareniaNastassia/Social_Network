import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chatAPI";
import {v1} from "uuid";


let initialChatState: InitialChatStateType = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export const chatReducer = (state: InitialChatStateType = initialChatState, action: ActionType): InitialChatStateType => {

    switch (action.type) {
        case 'chat/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) =>
                        index >= array.length - 100)
            }
        case 'chat/STATUS-CHANGED':
            return {...state, status: action.payload.status}

        default:
            return state
    }
}


//=======ACTIONS======

export const chatActions = {
    messagesReceivedAC: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES-RECEIVED',
        payload: {messages}
    } as const),
    statusChangedAC: (status: StatusType) => ({
        type: 'chat/STATUS-CHANGED',
        payload: {status}
    } as const),
}

//=======THUNK======

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newChatMessageHandlerCreator = (dispatch: AppDispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.messagesReceivedAC(messages))
        }
    }
    return _newMessageHandler
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(chatActions.statusChangedAC(status))
        }
    }
    return _statusChangedHandler
}


export const startChatMessagesThunkCreator = (): AppThunkType =>
    async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('messageReceived', newChatMessageHandlerCreator(dispatch))
        chatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch))
    }

export const stopChatMessagesThunkCreator = (): AppThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe('messageReceived', newChatMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch))
        chatAPI.stop()
    }

export const sendMessageThunkCreator = (message: string): AppThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message)
    }


//=======ACTION TYPES======

export type ChatActionsType = InferActionsTypes<typeof chatActions>

//=======TYPES======

export type InitialChatStateType = {
    messages: ChatMessageType[]
    status: StatusType
}

type ChatMessageType = ChatMessageAPIType & { id: string }





