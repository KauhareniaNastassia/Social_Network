import React from 'react';
import {ContactsType, ProfileType} from "../../../../types/types";


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

        </div>
    );
};

export default ProfileData;

//===========TYPE================

type ProfileDataPropsType = {
    profile: ProfileType | null

    isOwner: boolean
    goToEditMode: () => void
}
