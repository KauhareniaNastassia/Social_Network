import React, {ChangeEvent, useState} from 'react'
import css from './PostForm.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {profilePageActions} from "../../../../redux/profilePageReducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../../../hoc/useAppSelector";
import {appActions} from "../../../../redux/appReducer";


export type PostData = {
    post: string
}


export const PostForm: React.FC = () => {

    const [post, setPost] = useState('')
    const dispatch = useAppDispatch()


    const {register, handleSubmit, formState: {errors}} = useForm<{ post: string }>({
        defaultValues: {
            post: '',
        },
        mode: "onSubmit"
    });


    const onSubmit: SubmitHandler<PostData> = ({post}) => {
        dispatch(profilePageActions.addPostAC(post))
        setPost('')
        dispatch(appActions.setAppSuccessMessageAC('Post has been successfully published'))
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.currentTarget.value)
        dispatch(profilePageActions.updateNewPostTextAC(e.currentTarget.value))
    }


    return (
        <div >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={css.postFormWrapper}
                /*onKeyPress={(e) => {
                    if (e.code === 'Enter') {
                        onEnterPress(e.key)
                    }
                }}*/>

                <div className={css.postFormMessage}>

                     <div className={errors.post ? css.postFormMessage_error : css.postFormMessage_error_opacity}>{Object.values(errors).map((e, idx) => {
                        // @ts-ignore
                        return (<p key={idx}>{e.message}</p>)
                    })}</div>

                    <textarea
                        placeholder="What's new?)"
                        {...register("post", {
                            required: {
                                value: true,
                                message: "Your friends really wanna know what you think, so leave a comment please!"
                            },
                            maxLength: {
                                value: 280,
                                message: "Don't overdo it, 280 characters should be more than enough!"
                            }
                        })}
                        onChange={onPostChangeHandler}
                        value={post}
                        className={css.postForm__textarea}
                    />
                </div>



                <div className={css.postForm__BTN_block}>
                    <label></label>
                    <button
                        type="submit"
                        className={css.postForm__BTN}
                    >Add post
                    </button>
                </div>
            </form>
        </div>
    );
}
