import React, {ChangeEvent, useState} from 'react'
import css from './PostForm.module.css'
import {SubmitHandler, useForm} from "react-hook-form";


type PostData = {
    post: string
}

type PostFormPropsType = {
    newPostText: string
    addPost: () => void
    updateNewPostText:(updatedPostText: string) => void
}

export const PostForm = (props: PostFormPropsType) =>  {

    const[post, setPost] = useState(props.newPostText)

    const { register, handleSubmit } = useForm<PostData>({
        defaultValues: {
            post: '',
        },
        mode: "onSubmit"
    });


    const onSubmit: SubmitHandler<PostData> = (post: PostData) => {
        props.addPost()
        setPost('')
        console.log(post)
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.currentTarget.value)
    }


    return (
        <div className={css.postFormWrapper}>

            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyPress={(e) => onEnterPress(e.key)}>

                <div className={css.postFormMessage}>
                    <textarea
                        placeholder="What are you thinking about?)"
                        {...register("post")}
                        value={post}

                        onChange={onPostChangeHandler}
                        />
                </div>

                <div className={css.dialogsFormSendButton}>
                    <label></label>
                    <button
                        type="submit"
                    >Add post</button>
                </div>
            </form>
        </div>
    );
}
