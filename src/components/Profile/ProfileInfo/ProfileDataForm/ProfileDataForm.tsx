import React, {useState} from 'react';

import {Field, Form} from "react-final-form";
import {ProfileDataType} from "../../../../api/profileAPI";
import {Contact} from "../Contact/Contact";
import {ContactsType} from "../../../../types/types";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hoc/useAppSelector";


export const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({
                                                                        onSubmitData,
                                                                        profile
                                                                    }) => {

    const [lookingForAJobValue, setLookingForAJobValue] = useState(profile?.lookingForAJob)
    const myProfileId = useAppSelector((state) => state.auth.authId)

    const onSubmit = (values: UpdateProfileType) => {
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

                    {myProfileId && <div>

                        <button type="submit">
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

                    {/*<div>
                        <b>Contacts</b>: {Object
                        .keys(profile.contacts)
                        .map((key) => {
                            return <div key={key}>
                                <b>{key}: <Field
                                    name="Contacts"
                                    component="input"
                                    type="text"
                                /></b>
                            </div>
                        })}

                    </div>*/}

                    <pre>{JSON.stringify(values)}</pre>
                </form>
            )

            }
        />
    )
}

//===========TYPE================

type ProfileDataFormPropsType = {
    onSubmitData: (formData: UpdateProfileType) => void
    profile: ProfileDataType
}

export type UpdateProfileType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

