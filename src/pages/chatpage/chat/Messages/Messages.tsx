import React, {useEffect, useState} from 'react';
import {ChatMessageType} from "../../ChatPage";
import {message} from "antd";
import {Message} from "./message/Message";


type MessagesPropsType = {
    wsChannel: any
}


export const Messages: React.FC<MessagesPropsType> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])


    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    })


    return (
        <div style={{height: '600px', overflowY: 'auto'}}>
            {messages.map((message: any, index) => <Message key={index} message={message}/>)}
        </div>
    );
};

