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
                                                                status,
                                                            }) => {

    const [editMode, setEditMode] = useState(false)
    const myProfileId = useAppSelector((state) => state.auth.authId)
    const dispatch = useAppDispatch()

    const onSubmitData = (formData: UpdateProfileType) => {
        dispatch(saveProfileThunkCreator(formData))
        setEditMode(false)
    }

    if (!profile) {
        return <PreloaderCat/>
    }

    return (
        <div className={css.wrapper}>

            <ProfilePhoto
                myProfileId={myProfileId}
                photo={profile?.photos}/>

            <div className={css.wrapper_info}>

                <ProfileStatus
                    status={status}
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
                        />
                }
            </div>
        </div>
    )
}


//===========TYPE================

type ProfileInfoPropsType = {
    profile: ProfileDataType | null
    status: string
    isOwner: boolean

}


