import React from 'react'
import css from './Message.module.css'

type MessagePropsType = {
    message: string
}

export const Message = (props: MessagePropsType) => {

    return (
        <div className={css.message}> {props.message} </div>
    )
}