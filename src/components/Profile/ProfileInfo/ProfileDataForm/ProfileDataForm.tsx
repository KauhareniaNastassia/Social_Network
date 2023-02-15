import React, {useState} from 'react';

import {Field, Form} from "react-final-form";
import {ContactsType, ProfileType} from "../../../../types/types";
import {ProfileDataType} from "../../../../api/api";


export const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({
                                                                        onSubmitData,
                                                                        profile,
                                                                        isOwner
                                                                    }) => {

    const [lookingForAJobValue, setLookingForAJobValue] = useState(profile?.lookingForAJob)

    const onSubmit = (values: ProfileFormDataType) => {
        onSubmitData(values)

        /*window.alert(JSON.stringify(values))*/
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                fullName: profile?.fullName,
                lookingForAJob: profile?.lookingForAJob,
                lookingForAJobDescription: profile?.lookingForAJobDescription,
                aboutMe: profile?.aboutMe
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (


                <form onSubmit={handleSubmit}>

                    {isOwner && <div>

                        <button type="submit" >
                            Save
                        </button>

                    </div>}

                    <div>
                        <label>Full Name</label>
                        <Field
                            name="fullName"
                            component="input"
                            type="text"
                            placeholder='full name'
                        />
                    </div>
                    <div>
                        <label>Looking for a job:</label>
                        <Field
                            name="lookingForAJob"
                            autoFocus={true}
                            component="input"
                            type="checkbox"
                        />

                        {profile?.lookingForAJob === true &&
                            <div>
                                <label>Tell about job description:</label>
                                <Field
                                    name="lookingForAJobDescription"
                                    component="textarea"
                                    type="text"
                                    placeholder={'job description'}/>
                            </div>}

                    </div>

                    <div>
                        <label>About me</label>
                        <Field
                            name="aboutMe"
                            component="textarea"
                            placeholder="About me"/>
                    </div>

                    <pre>{JSON.stringify(values)}</pre>
                </form>
            )}
        />
    )
}

//===========TYPE================

type ProfileDataFormPropsType = {
    onSubmitData: (formData: ProfileFormDataType) => void
    profile: ProfileDataType | null
    isOwner: boolean
}

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

