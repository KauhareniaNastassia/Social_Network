import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileDataType} from "../../api/profileAPI";


export const Profile: React.FC<ProfilePropsType> = ({
                                                        profile,
                                                        status,
                                                        isOwner,


                                                    }) => {



    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                isOwner={isOwner}


            />
            <MyPostsContainer />
        </div>
    )
}

//===========TYPE================

type ProfilePropsType = {
    profile: ProfileDataType | null
    status: string
    isOwner: boolean
}