import React, {ChangeEvent} from 'react'

import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsPageReducer";


type DialogsPropsType = {
    store: AppStateType

   /* dialogsPage: DialogsPageType
    dispatch: (action: ActionType) => void*/

    /*sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
}


export const DialogsContainer = (props: DialogsPropsType) => {

    let sendMessageHandler = () => {
        props.store.dispatch(sendMessageAC( props.store.getState().dialogsPage.newMessageText ))
        props.store.getState().dialogsPage.newMessageText = ''
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        props.store.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
    }


    return (
        <Dialogs
            dialogs={props.store.getState().dialogsPage.dialogs}
            messages={props.store.getState().dialogsPage.messages}
            newMessageText={props.store.getState().dialogsPage.newMessageText}
            sendMessage={sendMessageHandler}
            updateNewMessageText={onMessageChange}/>
    )
}