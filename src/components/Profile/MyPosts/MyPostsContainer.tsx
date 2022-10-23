import React, {ChangeEvent} from "react";

import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profilePageReducer";
import {StoreContext} from "../../../StoreContext";
import {connect} from "react-redux";
import {Dispatch} from "redux";


/*type MyPostsPropsType = {
    //store: AppStateType
    /!*posts: PostType[]
    newPostText: string
    dispatch: (action: ActionType) => void*!/
    /!*addPost: (newPostText: string) => void*!/
    /!*updateNewPostText: (updatedPostText: string) => void*!/
}*/


export const MyPostsContainer = (props: MyPostsPropsType) => {

    return (
        <StoreContext.Consumer>
            {store => {

                let addPostHandler = () => {
                    store.dispatch(addPostAC(store.getState().profilePage.newPostText))
                }

                let onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(updateNewPostTextAC(e.currentTarget.value))
                }

                return <MyPosts
                    updateNewPostText={onPostChangeHandler}
                    addPost={addPostHandler}
                    posts={store.getState().profilePage.posts}
                    newPostText={store.getState().profilePage.newPostText}/>

            }}

        </StoreContext.Consumer>
    )
}


export type MyPostsPropsType = mapStateToMyPostsPropsType & mapDispatchToMyPostsPropsType

export type mapStateToMyPostsPropsType = {

}

export type mapDispatchToMyPostsPropsType = {

}

let mapStateToMyPostsProps = (state: AppStateType): mapStateToMyPostsPropsType => {
    return
}

let mapDispatchToMyPostsProps = (dispatch: Dispatch): mapDispatchToMyPostsPropsType => {
    return
}


export const MyPostsContainer = connect(mapStateToMyPostsProps, mapDispatchToMyPostsProps)(MyPosts)

/*

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

    /!*  dispatch={props.dispatch}*!//>
    )
}*/

