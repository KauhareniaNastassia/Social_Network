import React from 'react';
import {ContactsType, ProfileType} from "../../../../redux/profilePageReducer";


const ProfileData = (props: ProfileDataPropsType) => {

    return (
        <div>

            {props.isOwner && <div> <button onClick={props.goToEditMode}>Edit</button> </div>}

            <div>
                {props.profile?.fullName}
            </div>

            <div>
                <b>Looking for a job:</b> {props.profile?.lookingForAJob ? 'yes' : 'no'}
            </div>

            {
                props.profile?.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {props.profile?.lookingForAJobDescription}
                </div>
            }

            <div>
                <b>About me:</b> {props.profile?.aboutMe}
            </div>

        </div>
    );
};

export default ProfileData;

//===========TYPE================

type ProfileDataPropsType = {
    profile: ProfileType | null
    contacts: ContactsType
    isOwner: boolean
    goToEditMode: () => void
}
