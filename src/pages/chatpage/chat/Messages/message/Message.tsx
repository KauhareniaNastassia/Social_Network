import {ChatMessageType} from "../../../ChatPage";
import React from "react";


type MessagePropsType = {
    message: ChatMessageType
}

export const Message:React.FC<MessagePropsType> = ({message}) => {

    return <div>
        <img src={message.photo} alt='message url' style={{width: '30px'}}/> <b>{message.userName}</b>

        <br/>

        {message.message}
        <hr/>
    </div>
}