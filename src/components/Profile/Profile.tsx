import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../types/types";
import {ProfileDataType} from "../../api/api";


export const Profile: React.FC<ProfilePropsType> = ({
                                                        profile,
                                                        status,
                                                        updateStatus,
                                                        isOwner,
                                                        savePhoto,
                                                        saveProfile
                                                    }) => {



    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
                savePhoto={savePhoto}
                saveProfile={saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
}

//===========TYPE================

type ProfilePropsType = {
    profile: ProfileDataType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormDataType) => void
}