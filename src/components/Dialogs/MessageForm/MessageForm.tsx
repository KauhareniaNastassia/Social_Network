import React, {ChangeEvent, useState} from 'react'
import css from './MessageForm.module.css'
import {SubmitHandler, useForm} from "react-hook-form";


type MessageData = {
    message: string
}

type MessageFormPropsType = {
    sendMessage: () => void
    updateNewMessageText: (updatedMessageText: string) => void
}

export const MessageForm = (props: MessageFormPropsType) =>  {

    const[message, setMessage] = useState('')

    const { register, handleSubmit } = useForm<MessageData>({
        defaultValues: {
            message: '',
        },
        mode: "onSubmit"
    });


    const onSubmit: SubmitHandler<MessageData> = (message: MessageData) => {
        props.sendMessage()
        setMessage('')
        console.log(message)
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }


    return (
        <div className={css.dialogsFormWrapper}>

            <form
                onSubmit={handleSubmit(onSubmit)}
            onKeyPress={(e) => onEnterPress(e.key)}>

                <div className={css.dialogsFormMessage}>
                    <textarea
                        value={message}
                        placeholder="Write you want to say"
                        {...register("message")}
                        onChange={onMessageChange}
                        />
                </div>

                <div className={css.dialogsFormSendButton}>
                    <label></label>
                    <button
                        type="submit"
                    >Send</button>
                </div>
            </form>
        </div>
    );
}
