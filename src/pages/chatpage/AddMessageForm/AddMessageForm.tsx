import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessageThunkCreator} from "../../../redux/chatReducer";
import {useAppSelector} from "../../../hoc/useAppSelector";


export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useAppSelector(state => state.chat.status)

    const sendChatMessage = () => {
        if (!message) {
            return
        }
        dispatch(sendMessageThunkCreator(message))
        setMessage('')
    }


    return (
        <div>
            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
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
