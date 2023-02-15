import React, {ChangeEvent, useState} from "react";
import css from "./ProfileInfo.module.css"
import {PreloaderCat} from "../../../common/preloader/PreloaderCat/PreloaderCat";
import userImg from '../../../assets/img/profileAvatar.svg'
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks/ProfileStatusWithHooks";
import ProfileData from "./ProfileData/ProfileData";
import {ProfileDataForm, ProfileFormDataType} from "./ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../../types/types";



export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            props.savePhoto(e.currentTarget.files[0])
        }
    }

    const onSubmitData = (formData: ProfileFormDataType) => {
        props.saveProfile(formData)

        setEditMode(false)
    }

    if (!props.profile) {
        return <PreloaderCat/>
    }

    return (
        <div>
            <div className={css.descriptionBlock}>
                <img src={props.profile?.photos.large ? props.profile.photos.large : userImg} className={css.userImg}/>

                {props.isOwner &&
                    <input
                        type='file'
                        onChange={onMainPhotoSelected}
                    />}

                {
                    editMode
                        ? <ProfileDataForm
                            profile={props.profile}
                            contacts={props.profile.contacts}
                            isOwner={props.isOwner}
                            onSubmitData={onSubmitData}
                        />
                        : <ProfileData
                            profile={props.profile}
                            contacts={props.profile.contacts}
                            isOwner={props.isOwner}
                            goToEditMode={() => setEditMode(true)}
                        />
                }

                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
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


