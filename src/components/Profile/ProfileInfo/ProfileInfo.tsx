import React, {ChangeEvent, useState} from "react";
import css from "./ProfileInfo.module.scss"
import {PreloaderCat} from "../../../common/preloader/PreloaderCat/PreloaderCat";
import ProfileData from "./ProfileData/ProfileData";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {useAppDispatch, useAppSelector} from "../../../hoc/useAppSelector";
import {savePhotoThunkCreator, saveProfileThunkCreator} from "../../../redux/profilePageReducer";
import {ProfileDataType, UpdateProfileType} from "../../../api/profileAPI";
import {ProfilePhoto} from "./ProfilePhoto/ProfilePhoto";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";


export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                isOwner
                                                            }) => {

    const [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch()

    const onSubmitData = (formData: UpdateProfileType) => {
        dispatch(saveProfileThunkCreator(formData))
        console.log('onSubmitData', formData)
        setEditMode(false)
    }

    if (!profile) {
        return <PreloaderCat/>
    }

    return (
        <div className={css.wrapper}>

            <ProfilePhoto
                photo={profile?.photos}
                isOwner={isOwner}/>

            <div className={css.wrapper_info}>

                <ProfileStatus
                    isOwner={isOwner}
                />

                {
                    editMode
                        ? <ProfileDataForm
                            profile={profile}
                            onSubmitData={onSubmitData}
                        />

                        : <ProfileData
                            profile={profile}
                            goToEditMode={() => setEditMode(true)}
                            isOwner={isOwner}
                        />
                }
            </div>
        </div>
    )
}


//===========TYPE================

type ProfileInfoPropsType = {
    profile: ProfileDataType | null
    isOwner: boolean

}


