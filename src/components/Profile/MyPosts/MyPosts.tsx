import React, {ChangeEvent} from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {ActionType, addPostAC, PostType, updateNewPostTextAC} from "../../../redux/store";


type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: ActionType) => void

    /*addPost: (newPostText: string) => void*/
    /*updateNewPostText: (updatedPostText: string) => void*/
}




export const MyPosts = (props: MyPostsPropsType) => {

    let addPostHandler = () => {
        props.dispatch(addPostAC(props.newPostText) )
        props.newPostText = ''
    }

    let onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        props.dispatch(updateNewPostTextAC(e.currentTarget.value ))
    }


    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChangeHandler}
                        value={props.newPostText}
                        />
                </div>
                <div>
                    <button onClick={addPostHandler}> Add post</button>
                </div>

            </div>
            <div className={css.posts}>
                {props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    )
}

/*
<HTMLTextAreaElement>*/
