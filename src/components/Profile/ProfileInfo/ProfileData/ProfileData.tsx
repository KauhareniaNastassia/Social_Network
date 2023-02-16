import React from 'react';
import {ProfileDataType} from "../../../../api/profileAPI";
import {Contact} from "../Contact/Contact";
import {ContactsType} from "../../../../types/types";


const ProfileData: React.FC<ProfileDataPropsType> = ({
                                                         isOwner,
                                                         goToEditMode,
                                                         profile,
                                                     }) => {

    return (
        <div>

            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}

            <div>
                {profile?.fullName}
            </div>

            <div>
                <b>Looking for a job:</b> {profile?.lookingForAJob ? 'yes' : 'no'}
            </div>

            {
                profile?.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile?.lookingForAJobDescription}
                </div>
            }

            <div>
                <b>About me:</b> {profile?.aboutMe}
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

        </div>
    );
};

export default ProfileData;

//===========TYPE================

type ProfileDataPropsType = {
    profile: ProfileDataType

    isOwner: boolean
    goToEditMode: () => void
}
