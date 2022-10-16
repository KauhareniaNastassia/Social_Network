import React from 'react'
import css from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type DialogsPropsType = {}
type DialogsDataPropsType = {
    id: string,
    name: string
}
type MessagesDataPropsType = {
    id: string,
    message: string
}

let dialogsData: DialogsDataPropsType[] = [
    { id: '1', name: "Nastassia"},
    { id: '2', name: "Lena"},
    { id: '3', name: "Lesya"},
    { id: '4', name: "Olga"},
]

let messagesData: MessagesDataPropsType[] = [
    { id: '1', message: "Hi?"},
    { id: '2', message: "How is your cat?"},
    { id: '3', message: "Woof-woof"},
]


export const Dialogs = (props: DialogsPropsType) => {
    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                <DialogItem
                    name={dialogsData[0].name}
                    id={dialogsData[0].id}/>
                <DialogItem
                    name={dialogsData[1].name}
                    id={dialogsData[1].id}/>
                <DialogItem
                    name={dialogsData[2].name}
                    id={dialogsData[2].id}/>
                <DialogItem
                    name={dialogsData[3].name}
                    id={dialogsData[3].id}/>
            </div>
            <div className={css.messages}>
                <Message message={messagesData[0].message}/>
                <Message message={messagesData[1].message}/>
                <Message message={messagesData[2].message}/>
            </div>
        </div>
    )
}