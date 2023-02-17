import React from 'react';
import {Chat} from "./chat/Chat";



const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export const ChatPage:React.FC = () => {
    return (
        <div>
            <Chat wsChannel={wsChannel}/>
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
