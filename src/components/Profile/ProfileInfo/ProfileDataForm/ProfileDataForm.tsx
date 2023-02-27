import React from 'react';

import {Field, Form} from "react-final-form";
import {ProfileDataType} from "../../../../api/profileAPI";
import {useAppSelector} from "../../../../hoc/useAppSelector";
import css from "./ProfileDataForm.module.scss";


export const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({
                                                                        onSubmitData,
                                                                        profile
                                                                    }) => {


    const myProfileId = useAppSelector((state) => state.auth.authId)

    const onSubmit = (values: UpdateProfileType) => {
        onSubmitData(values)
        console.log(values)
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


                <form onSubmit={handleSubmit} className={css.wrapper__profileData}>

                    <div className={css.profileData_item}>
                        <label className={css.wrapper__profileData_title}>Full Name</label>
                        <Field
                            className={css.wrapper__profileData_field}
                            name="fullName"
                            component="input"
                            type="text"
                            placeholder='full name'
                        />
                    </div>
                    <div className={css.profileData_item}>
                        <label className={css.wrapper__profileData_title}>Do you have a pet?:</label>
                        <Field
                            name="lookingForAJob"
                            autoFocus={true}
                            component="input"
                            type="checkbox"
                        />
                    </div>

                    <div className={css.profileData_item}>
                        <label className={css.wrapper__profileData_title}>It's name:</label>
                        <Field

                            className={css.wrapper__profileData_field}
                            name="lookingForAJobDescription"
                            component="textarea"
                            type="text"
                            placeholder={'job description'}/>
                    </div>
                    <div className={css.profileData_item}>
                        <label className={css.wrapper__profileData_title}>About me</label>
                        <Field
                            className={css.wrapper__profileData_field}
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

                    {/* <pre>{JSON.stringify(values)}</pre>*/}

                    {myProfileId &&
                        <div className={css.wrapper__profileData_btnBlock}>

                            <button className={css.wrapper__profileData_btn} type="submit">
                                Save
                            </button>

                        </div>}
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

