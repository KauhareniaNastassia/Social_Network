import React from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {MessageForm} from "./MessageForm/MessageForm";


export const Dialogs = (props: DialogsPropsType) => {
    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.dialogId} name={dialog.name} dialogId={dialog.dialogId}/>)}

            </div>
            <div className={css.messages}>
                {props.dialogsPage.messages.map(message => <Message key={message.messageId} message={message.message}/>)}
            </div>

            <MessageForm sendMessage={props.sendMessage}
                         updateNewMessageText={props.updateNewMessageText}/>

        </div>
    )
}