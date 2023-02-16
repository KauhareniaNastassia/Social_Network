import React from "react";
import css from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {PostForm} from "./PostForm/PostForm";

export const MyPosts: React.FC<MyPostsPropsType> = ({
                                                        newPostText,
                                                        addPost,
                                                        updateNewPostText,
                                                        posts
                                                    }) => {

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm newPostText={newPostText}
                          addPost={addPost}
                          updateNewPostText={updateNewPostText}/>

            </div>
            <div className={css.posts}>
                {posts.map(post => <Post key={post.postId} message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    )
}

