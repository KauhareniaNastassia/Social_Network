import React, {ChangeEvent} from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/store";
import {MyPostsPropsType} from "./MyPostsContainer";
import {PostForm} from "./PostForm/PostForm";


/*type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void

    //dispatch: (action: ActionType) => void
}*/


export const MyPosts = (props: MyPostsPropsType) => {

    let addPostHandler = () => {
        props.addPost()
        /*props.newPostText = ''*/

        /*props.dispatch(addPostAC(props.newPostText) )
        props.newPostText = ''*/
    }

    let onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)

        //props.dispatch(updateNewPostTextAC(e.currentTarget.value ))
    }


    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>


                {/*<div>
                    <textarea
                        onChange={onPostChangeHandler}
                        value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPostHandler}> Add post</button>
                </div>*/}

                <PostForm newPostText={props.newPostText}
                          addPost={props.addPost}
                          updateNewPostText={props.updateNewPostText}/>

            </div>
            <div className={css.posts}>
                {props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    )
}

