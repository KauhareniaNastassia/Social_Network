
import React from "react";
import {ChatMessageAPIType} from "../../../../api/chatAPI";


type MessagePropsType = {
    message: ChatMessageAPIType
}

export const Message:React.FC<MessagePropsType> = React.memo(({message}) => {

    return <div>
        <img src={message.photo} alt='message url' style={{width: '30px'}}/> <b>{message.userName}</b>

        <br/>

        {message.message}
        <hr/>
    </div>
})