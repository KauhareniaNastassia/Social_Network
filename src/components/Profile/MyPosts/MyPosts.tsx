import React from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
    posts: PostType[]
}


export const MyPosts = (props: MyPostsPropsType) => {
    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button> Add post</button>
                </div>

            </div>
            <div className={css.posts}>
                { props.posts.map( post => <Post message={post.message} likesCount={post.likesCount}/> ) }
            </div>
        </div>
    )
}