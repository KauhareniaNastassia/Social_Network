import React from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {PostForm} from "./PostForm/PostForm";

export const MyPosts = (props: MyPostsPropsType) => {

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm newPostText={props.newPostText}
                          addPost={props.addPost}
                          updateNewPostText={props.updateNewPostText}/>

            </div>
            <div className={css.posts}>
                {props.posts.map(post => <Post key={post.postId} message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    )
}

