import React, {useEffect, useState} from 'react';
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import {useDispatch} from "react-redux";
import {startChatMessagesThunkCreator, stopChatMessagesThunkCreator} from "../../redux/chatReducer";
import {Messages} from "./Messages/Messages";
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import css from './ChatPage.module.scss'

export const ChatPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.chat.status)

    useEffect( () => {
        dispatch(startChatMessagesThunkCreator())

        return () => {
            stopChatMessagesThunkCreator()
        }
        console.log("chat")
    }, [])


    return (
        <div className={css.wrapper__chatPage}>
            {status === 'error' && <div>Some error occured. Please refresh page</div>}
                 <div >
                    <Messages />
                    <AddMessageForm />
                </div>
        </div>
    );
};


//================TYPES==============

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
