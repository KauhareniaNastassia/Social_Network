import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessageThunkCreator} from "../../../redux/chatReducer";
import {useAppDispatch, useAppSelector} from "../../../hoc/useAppSelector";


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
        <div>
            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyPress={onKeyPressSendMessage}
                    placeholder='Press Ctrl+Enter or button Send to send message'
                >
                </textarea>
            </div>
            <div>
                <button
                    disabled={status !== "ready"}
                    onClick={sendChatMessage}>Send
                </button>
            </div>
        </div>
    );
};
