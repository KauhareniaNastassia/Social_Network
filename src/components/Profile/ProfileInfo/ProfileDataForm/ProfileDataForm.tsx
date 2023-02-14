import React, {ChangeEvent, useState} from 'react';
import {Contact} from "../Contact/Contact";
import {ContactsType, ProfileType} from "../../../../redux/profilePageReducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {Form, Field} from "react-final-form";

type ProfileDataFormPropsType = {
    onSubmitData: (formData: ProfileFormDataType) => void
    profile: ProfileType | null
    contacts: ContactsType
    isOwner: boolean
}

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string

}


export const ProfileDataForm = (props: ProfileDataFormPropsType) => {

    const [fullNameValue, setFullNameValue] = useState(props.profile?.fullName)
    const [lookingForAJobValue, setLookingForAJobValue] = useState(props.profile?.lookingForAJob)
    const [lookingForAJobDescrValue, setLookingForAJobDescrValue] = useState(props.profile?.lookingForAJobDescription)
    const [aboutMeValue, setAboutMeValue] = useState(props.profile?.aboutMe)


    /*const onChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
        setFullNameValue(e.currentTarget.value)
    }*/

    const onSubmit = (values: ProfileFormDataType) => {
        props.onSubmitData(values)

        /*window.alert(JSON.stringify(values))*/
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                fullName: props.profile?.fullName,
                lookingForAJob: lookingForAJobValue,
                lookingForAJobDescription: lookingForAJobDescrValue,
                aboutMe: aboutMeValue
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (


                <form onSubmit={handleSubmit}>

                    {props.isOwner && <div>

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
                            checked={lookingForAJobValue}
                            onChange={() => setLookingForAJobValue(!lookingForAJobValue)}
                        />

                        {lookingForAJobValue === true &&
                            <div>
                                <label>Tell about job description:</label>
                                <Field
                                    value={lookingForAJobDescrValue}
                                    name="lookingForAJobDescription"
                                    component="textarea"
                                    type="text"
                                    placeholder={'job description'}/>
                            </div>}

                    </div>



                    <div>
                        <label>About me</label>
                        <Field
                            value={aboutMeValue}
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


/*{props.isOwner && <div> <button onClick={props.goToEditMode}>Save</button> </div>}

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

<div>
    <b>Contacts: </b> {Object.keys(props.contacts).map(contact => {

        return <Contact
            key={contact}
            contactTitle={contact}
            contactValue={contact}
        />
    }
)}
</div>*/
