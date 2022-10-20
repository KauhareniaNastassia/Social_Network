import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionType, ProfilePageType} from "../../redux/store";


type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionType) => void
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void*/
}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}

                /*addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}*/
            />
        </div>
    )
}