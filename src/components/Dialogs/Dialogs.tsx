import React from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {MessageForm} from "./MessageForm/MessageForm";


export const Dialogs = (props: DialogsPropsType) => {

    /*let sendMessageHandler = () => {
        props.sendMessage()
        /!*props.dialogsPage.newMessageText = ''*!/
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
        //props.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
    }*/

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)}

            </div>
            <div className={css.messages}>
                {props.dialogsPage.messages.map(message => <Message key={message.id} message={message.message}/>)}
            </div>

            {/*<div>
                <textarea value={props.dialogsPage.newMessageText}
                          onChange={onMessageChange}
                          />
            </div>
            <div>
                <button onClick={sendMessageHandler}> Send</button>
            </div>*/}

            <MessageForm sendMessage={props.sendMessage}
                         updateNewMessageText={props.updateNewMessageText}/>

        </div>
    )
}