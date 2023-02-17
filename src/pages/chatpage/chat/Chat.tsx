import React, {useEffect} from 'react';
import {Messages} from "./Messages/Messages";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";

type ChatPropsType = {
    wsChannel: any
}

export const Chat:React.FC<ChatPropsType> = ({wsChannel}) => {


    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    );
};

