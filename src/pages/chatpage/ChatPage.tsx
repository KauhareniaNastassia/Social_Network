import React, {useEffect, useState} from 'react';
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import {useDispatch} from "react-redux";
import {startChatMessagesThunkCreator, stopChatMessagesThunkCreator} from "../../redux/chatReducer";
import {Messages} from "./Messages/Messages";
import {useAppSelector} from "../../hoc/useAppSelector";

export const ChatPage: React.FC = () => {

    const dispatch = useDispatch()
    const status = useAppSelector(state => state.chat.status)

    useEffect( () => {
        dispatch(startChatMessagesThunkCreator())

        return () => {
            stopChatMessagesThunkCreator()
        }
    }, [])


    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh page</div>}
                 <>
                    <Messages />
                    <AddMessageForm />
                </>
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
