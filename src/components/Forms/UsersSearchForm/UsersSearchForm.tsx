import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FilterType} from "../../../api/usersAPI";
import {useAppSelector} from "../../../hoc/useAppSelector";


const UsersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

export const UsersSearchForm = React.memo((props: UsersSearchFormType) => {

    const filter = useAppSelector( (state) => state.usersPage.filter )

    const submit = (
        values: FormType,
        {setSubmitting}: {setSubmitting: (setSubmitting: boolean) => void}
    ) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === 'null' ? null
                    : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
                validate={UsersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
})


//=============TYPES===============

type UsersSearchFormType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: FriendType
}

type FriendType = 'true' | 'false' | 'null'
