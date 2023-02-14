import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profilePageReducer";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormDataType) => void
    //store: AppStateType
    /*profilePage: ProfilePageType
    dispatch: (action: ActionType) => void*/
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void*/
}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer


                //store={props .store}
                /*posts={props.store.getState().profilePage.posts}
                newPostText={props.store.getState().profilePage.newPostText}
                dispatch={props.store.dispatch}*/
                /*addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}*/
            />
        </div>
    )
}