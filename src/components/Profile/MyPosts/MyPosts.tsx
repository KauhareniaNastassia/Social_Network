import React from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";

type MyPostsPropsType = {}
type PostDataPropsType = {
    id: string,
    message: string
    likesCount: number
}

let postsData: PostDataPropsType[] = [
    {
        id: '1',
        message: "Hi, how are you?",
        likesCount: 15
    },
    {
        id: '2',
        message: "It is my first post",
        likesCount: 5
    },
]


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
                <Post message={postsData[0].message} likesCount={postsData[0].likesCount}/>
                <Post message={postsData[1].message} likesCount={postsData[1].likesCount}/>
            </div>
        </div>
    )
}