import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profilePageReducer";


type ProfilePropsType = {
    profile: ProfileType | null
    //store: AppStateType
    /*profilePage: ProfilePageType
    dispatch: (action: ActionType) => void*/
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void*/
}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer


                //store={props.store}
                /*posts={props.store.getState().profilePage.posts}
                newPostText={props.store.getState().profilePage.newPostText}
                dispatch={props.store.dispatch}*/
                /*addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}*/
            />
        </div>
    )
}