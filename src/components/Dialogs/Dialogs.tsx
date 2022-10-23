import React, {ChangeEvent} from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/store";
import {DialogsPropsType} from "./DialogsContainer";


/*type DialogsPropsType = {
    sendMessage: () => void
    updateNewMessageText: (e: ChangeEvent<HTMLTextAreaElement>) => void
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string


    /!*dialogsPage: DialogsPageType
    dispatch: (action: ActionType) => void*!/
    /!*sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*!/
}*/


export const Dialogs = (props: DialogsPropsType) => {

    let sendMessageHandler = () => {
        props.sendMessage()

    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let updatedMessageText = e.target.value
        props.updateNewMessageText(updatedMessageText)

        //props.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
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