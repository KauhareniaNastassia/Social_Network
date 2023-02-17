import React from 'react'
import css from './DialogsPage.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessageForm} from "./MessageForm/MessageForm";
import {useAppSelector} from "../../hoc/useAppSelector";


export const DialogsPage: React.FC = () => {

    const dialogsPage = useAppSelector((state) => state.dialogsPage)

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.dialogId} name={dialog.name} dialogId={dialog.dialogId}/>)}

            </div>
            <div className={css.messages}>
                {dialogsPage.messages.map(message => <Message key={message.messageId} message={message.message}/>)}
            </div>

            <MessageForm />

        </div>
    )
}