import React, {useEffect, useRef, useState} from 'react';

import {Message} from "./message/Message";
import {useAppSelector} from "../../../hoc/useAppSelector";
import {message} from "antd";


export const Messages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useAppSelector(state => state.chat.messages)


    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget

        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
        console.log(messages)
    }, [messages])

    return (
        <div
            style={{height: '600px', overflowY: 'auto'}}
            onScroll={onScrollHandler}>
            {messages.map((m, index) =>
                <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

