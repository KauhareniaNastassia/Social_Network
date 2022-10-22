import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionType, ProfilePageType, StoreType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";


type ProfilePropsType = {
    store: StoreType
    /*profilePage: ProfilePageType
    dispatch: (action: ActionType) => void*/
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void*/
}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}

                /*posts={props.store.getState().profilePage.posts}
                newPostText={props.store.getState().profilePage.newPostText}
                dispatch={props.store.dispatch}*/

                /*addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}*/
            />
        </div>
    )
}