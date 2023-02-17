import React, {useState} from 'react';

type MessagesPropsType = {
    wsChannel: any
}

export const AddMessageForm: React.FC<MessagesPropsType> = ({wsChannel}) => {
    const [message, setMessage] = useState('')

    const sendChatMessage = () => {
        if (!message) {
            return
        }

        wsChannel.send(message)
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
                <button onClick={sendChatMessage}>Send</button>
            </div>
        </div>
    );
};
