import React, {ChangeEvent} from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../redux/store";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionType) => void

    /*sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
}


export const Dialogs = (props: DialogsPropsType) => {

    let sendMessageHandler = () => {
        props.dispatch(sendMessageAC( props.dialogsPage.newMessageText ))
        props.dialogsPage.newMessageText = ''
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        props.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
    }


    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)}

            </div>
            <div className={css.messages}>
                {props.dialogsPage.messages.map(message => <Message message={message.message}/>)}
            </div>

            <div>
                <textarea value={props.dialogsPage.newMessageText}
                          onChange={onMessageChange}
                          />
            </div>
            <div>
                <button onClick={sendMessageHandler}> Send</button>
            </div>

        </div>
    )
}