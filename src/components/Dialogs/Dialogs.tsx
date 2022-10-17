import React from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: DialogType[]
    messages: MessageType[]
}


export const Dialogs = (props: DialogsPropsType) => {
    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                { props.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> ) }

            </div>
            <div className={css.messages}>
                { props.messages.map( message => <Message message={message.message}/> ) }
            </div>
        </div>
    )
}