
import React from "react";
import {ChatMessageAPIType} from "../../../../api/chatAPI";
import css from './Message.module.scss'


type MessagePropsType = {
    message: ChatMessageAPIType
}

export const Message:React.FC<MessagePropsType> = React.memo(({message}) => {

    return <div className={css.wrapper__message}>
        <img
            src={message.photo}
            alt='message url'
            className={css.message__userPhoto}
           />

        <div className={css.wrapper__message_block}>
            <div className={css.wrapper__message_name}>
                {message.userName}
            </div>
            <div className={css.wrapper__message_message}>
                {message.message}
            </div>

        </div>

        <hr/>
    </div>
})