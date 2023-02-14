import React from "react";

import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {addPostAC, PostType, updateNewPostTextAC} from "../../../redux/profilePageReducer";

import {connect} from "react-redux";
import {Dispatch} from "redux";



export type MyPostsPropsType = mapStateToMyPostsPropsType & mapDispatchToMyPostsPropsType

export type mapStateToMyPostsPropsType = {
    posts: PostType[]
    newPostText: string
}

export type mapDispatchToMyPostsPropsType = {
    updateNewPostText: (updatedPostText: string) => void
    addPost: () => void
}

let mapStateToMyPostsProps = (state: AppStateType): mapStateToMyPostsPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToMyPostsProps = (dispatch: Dispatch): mapDispatchToMyPostsPropsType => {
    return {
        updateNewPostText: (updatedPostText: string) => {
            dispatch(updateNewPostTextAC(updatedPostText))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}


export const MyPostsContainer = connect(mapStateToMyPostsProps, mapDispatchToMyPostsProps)(MyPosts)

