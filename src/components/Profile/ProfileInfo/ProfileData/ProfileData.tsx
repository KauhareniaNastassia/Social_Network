import React from 'react';
import {ProfileDataType} from "../../../../api/profileAPI";
import css from './ProfileData.module.scss'


const ProfileData: React.FC<ProfileDataPropsType> = ({
                                                         goToEditMode,
                                                         profile,
                                                         isOwner
                                                     }) => {


    return (
        <div className={css.wrapper__profileData}>

            <div className={css.wrapper__profileData_name}>
                {profile?.fullName}
            </div>

            <div className={css.profileData_item}>
                <div className={css.wrapper__profileData_title}>Do you have a pet?:</div>
                <div className={css.wrapper__profileData_desc}>{profile?.lookingForAJob ? 'yes' : 'no'}</div>
            </div>

            {
                profile?.lookingForAJob &&
                <div className={css.profileData_item}>
                    <div className={css.wrapper__profileData_title}>It's name:</div>
                    <div className={css.wrapper__profileData_desc}>{profile?.lookingForAJobDescription}</div>
                </div>
            }

            {
                profile?.aboutMe && <div className={css.profileData_item}>
                    <div className={css.wrapper__profileData_title}>About me:</div>
                    <div className={css.wrapper__profileData_desc}>{profile?.aboutMe}</div>
                </div>
            }


            {isOwner &&
                <div className={css.wrapper__profileData_btnBlock}>
                    <button className={css.wrapper__profileData_btn} onClick={goToEditMode}>Edit</button>
                </div>}

        </div>
    );
};

export default ProfileData;

//===========TYPE================

type ProfileDataPropsType = {
    profile: ProfileDataType
    goToEditMode: () => void
    isOwner: boolean
}
