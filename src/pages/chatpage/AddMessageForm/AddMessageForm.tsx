import React, {useState} from 'react';
import {sendMessageThunkCreator} from "../../../redux/chatReducer";
import {useAppDispatch, useAppSelector} from "../../../hoc/useAppSelector";
import css from './AddMessageForm.module.scss'


export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.chat.status)

    const sendChatMessage = () => {
        if (!message) {
            alert('You should write something)')
            return
        }
        dispatch(sendMessageThunkCreator(message))
        setMessage('')
    }

    const onKeyPressSendMessage = (event: any) => {
        if (event.ctrlKey && event.code === 'Enter') {
            sendChatMessage()
        }
    }


    return (
        <div className={css.wrapper__addMessageForm}>
            <div className={css.wrapper__content}>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyPress={onKeyPressSendMessage}
                    placeholder='Press Ctrl+Enter or button Send to send message'
                    className={css.addMessageForm__textarea}
                >
                </textarea>

                <div>
                    <button
                        className={css.addMessageForm__button}
                        disabled={status !== "ready"}
                        onClick={sendChatMessage}>Send
                    </button>
                </div>
            </div>

        </div>
    );
};
