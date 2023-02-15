import React from "react";

import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";


import {connect} from "react-redux";
import {Dispatch} from "redux";
import {PostType} from "../../../types/types";
import {profilePageActions} from "../../../redux/profilePageReducer";



export type MyPostsPropsType = mapStateToMyPostsPropsType & mapDispatchToMyPostsPropsType

export type mapStateToMyPostsPropsType = {
    posts: PostType[]
    newPostText: string
}

export type mapDispatchToMyPostsPropsType = {
    updateNewPostText: (updatedPostText: string) => void
    addPost: (newPostText: string) => void
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
            dispatch(profilePageActions.updateNewPostTextAC(updatedPostText))
        },
        addPost: (newPostText: string) => {
            dispatch(profilePageActions.addPostAC(newPostText))
        }
    }
}


export const MyPostsContainer = connect(mapStateToMyPostsProps, mapDispatchToMyPostsProps)(MyPosts)

