import React from "react";
import css from "./MyPosts.module.scss"
import {Post} from "./Post/Post";

import {useAppSelector} from "../../../hoc/useAppSelector";
import {PostForm} from "./PostForm/PostForm";

export const MyPosts: React.FC = () => {


    const posts = useAppSelector((state) => state.profilePage.posts)
    const userPhoto = useAppSelector((state) => state.profilePage.profile?.photos)

    return (
        <div className={css.wrapper__posts}>
            <div className={css.wrapper__addPosts_block}>
                    <PostForm />
            </div>

            <div className={css.posts}>
                {posts.map(post => <Post
                    key={post.postId}
                    message={post.message}
                    likesCount={post.likesCount}
                    userPhoto={userPhoto}/>)}
            </div>
        </div>
    )
}

