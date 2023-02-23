import React from 'react';
import {ProfileDataType} from "../../../../api/profileAPI";
import {useAppSelector} from "../../../../hoc/useAppSelector";
import css from './ProfileData.module.scss'


const ProfileData: React.FC<ProfileDataPropsType> = ({
                                                         goToEditMode,
                                                         profile,
                                                     }) => {

    const myProfileId = useAppSelector((state) => state.auth.authId)

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

            <div className={css.profileData_item}>
                <div className={css.wrapper__profileData_title}>About me:</div>
                <div className={css.wrapper__profileData_desc}>{profile?.aboutMe}</div>
            </div>

            {/*<div>
                <b>Contacts</b>: {
                Object
                    .keys(profile.contacts)
                    .map((key) => {
                        return <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
            </div>*/}

            {myProfileId &&
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
}
