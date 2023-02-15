import React, {ChangeEvent, useState} from "react";
import css from "./ProfileInfo.module.css"
import {PreloaderCat} from "../../../common/preloader/PreloaderCat/PreloaderCat";
import userImg from '../../../assets/img/profileAvatar.svg'
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks/ProfileStatusWithHooks";
import ProfileData from "./ProfileData/ProfileData";
import {ProfileDataForm, ProfileFormDataType} from "./ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../../types/types";


export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                savePhoto,
                                                                saveProfile
                                                            }) => {

    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    const onSubmitData = (formData: ProfileFormDataType) => {
        saveProfile(formData)

        setEditMode(false)
    }

    if (!profile) {
        return <PreloaderCat/>
    }

    return (
        <div>
            <div className={css.descriptionBlock}>
                <img src={profile?.photos.large ? profile.photos.large : userImg} className={css.userImg}/>

                {isOwner &&
                    <input
                        type='file'
                        onChange={onMainPhotoSelected}
                    />}

                {
                    editMode
                        ? <ProfileDataForm
                            profile={profile}
                            isOwner={isOwner}
                            onSubmitData={onSubmitData}
                        />
                        : <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            goToEditMode={() => setEditMode(true)}
                        />
                }

                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>

        </div>
    )
}


//===========TYPE================

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormDataType) => void
}


