import React, {ChangeEvent} from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType, sendMessageAC, StoreType, updateNewMessageTextAC} from "../../redux/store";
import {Dialogs} from "./Dialogs";


type DialogsPropsType = {
    store: StoreType

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