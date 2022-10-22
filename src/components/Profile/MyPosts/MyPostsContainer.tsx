import React, {ChangeEvent} from "react";
import {addPostAC, StoreType, updateNewPostTextAC} from "../../../redux/store";
import {MyPosts} from "./MyPosts";


type MyPostsPropsType = {
    store: StoreType

    /*posts: PostType[]
    newPostText: string
    dispatch: (action: ActionType) => void*/
    /*addPost: (newPostText: string) => void*/
    /*updateNewPostText: (updatedPostText: string) => void*/
}




export const MyPostsContainer = (props: MyPostsPropsType) => {

    let addPostHandler = () => {
        props.store.dispatch(addPostAC(props.store.getState().profilePage.newPostText) )

    }

    let onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch(updateNewPostTextAC(e.currentTarget.value ))
    }


    return (
        <MyPosts
            updateNewPostText={onPostChangeHandler}
            addPost={addPostHandler}
            posts={props.store.getState().profilePage.posts}
            newPostText={props.store.getState().profilePage.newPostText}

           /*  dispatch={props.dispatch}*//>
    )
}

/*
<HTMLTextAreaElement>*/
