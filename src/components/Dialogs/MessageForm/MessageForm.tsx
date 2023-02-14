import React, {ChangeEvent, useState} from 'react'
import css from './MessageForm.module.css'
import {SubmitHandler, useForm} from "react-hook-form";


export const MessageForm = (props: MessageFormPropsType) => {

    const [message, setMessage] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm<MessageData>({
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
        props.updateNewMessageText(e.currentTarget.value)
    }


    return (
        <div className={css.dialogsFormWrapper}>

            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyPress={(e) => onEnterPress(e.key)}>

                <div className={css.dialogsFormMessage}>
                    <textarea

                        placeholder="Write you want to say"
                        {...register("message", {
                            required: {
                                value: true,
                                message: "Write something)"
                            }
                        })}
                        onChange={onMessageChange}
                        value={message}
                    />
                </div>

                {errors.message && <div> {Object.values(errors).map((e, idx) => {
                    return (<p key={idx}>{e.message}</p>)
                })
                } </div>}

                <div className={css.dialogsFormSendButton}>
                    <label></label>
                    <button
                        type="submit"
                    >Send
                    </button>
                </div>
            </form>
        </div>
    );
}


//===========TYPE================

type MessageData = {
    message: string
}

type MessageFormPropsType = {
    sendMessage: () => void
    updateNewMessageText: (updatedMessageText: string) => void
}