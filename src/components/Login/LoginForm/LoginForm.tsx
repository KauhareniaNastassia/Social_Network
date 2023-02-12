import React from 'react';
import {useFormik} from 'formik';
import css from "./LoginForm.module.css"


export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type LoginErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

type LoginFormPropsType = {
    loginThunkCreator: (data: LoginDataType, setStatus: any) => void
}

const validate = (values: LoginDataType) => {
    const errors: LoginErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password is too short, it must be 8 characters or more';
    }

    return errors;
};

export const LoginForm = (props: LoginFormPropsType) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
            //login: '',
        },
        validate,
        onSubmit: (values: LoginDataType, {setStatus}) => {
            props.loginThunkCreator(values, setStatus)
            /*dispatch(loginThunkCreator(values))*/

            /*  formik.resetForm()*/
        },

    });


    return (
        <form onSubmit={formik.handleSubmit} className={css.loginForm}>

            <div>
                <div className={css.emailBlock}>
                    <label className={css.emailLabel} htmlFor="Email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>

                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                <div className={css.passwordBlock}>
                    <label className={css.passwordLabel} htmlFor="Password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>

                {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}

                <div className={css.rememberMeBlock}>
                    <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>

                {/* <button disabled={formik.isSubmitting} className={css.submitBtn} type="submit">Sign In</button>*/}
                <button type="submit">Login</button>
                {/*{formik.status && <div>{formik.status}</div>}*/}

                {
                    formik.status ? <div>{formik.errors}</div> : null
                }

            </div>
        </form>
    );
};