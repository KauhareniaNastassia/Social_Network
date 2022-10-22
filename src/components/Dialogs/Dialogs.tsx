import React, {ChangeEvent} from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/store";


type DialogsPropsType = {
    sendMessage: () => void
    updateNewMessageText: (e: ChangeEvent<HTMLTextAreaElement>) => void
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string


    /*dialogsPage: DialogsPageType
    dispatch: (action: ActionType) => void*/
    /*sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
}


export const Dialogs = (props: DialogsPropsType) => {

    let sendMessageHandler = () => {
        props.sendMessage()

    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger

        props.updateNewMessageText(e)

        //props.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
    }


    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)}

            </div>
            <div className={css.messages}>
                {props.messages.map(message => <Message message={message.message}/>)}
            </div>

            <div>
                <textarea value={props.newMessageText}
                          onChange={onMessageChange}
                          />
            </div>
            <div>
                <button onClick={sendMessageHandler}> Send</button>
            </div>

        </div>
    )
}