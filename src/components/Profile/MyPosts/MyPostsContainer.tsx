import React, {ChangeEvent} from "react";

import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profilePageReducer";


type MyPostsPropsType = {
    store: AppStateType

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
