import React from 'react';
import {Field, Form, useFormik} from 'formik';
import css from "./LoginForm.module.css"
import {useDispatch} from "react-redux";
import {loginThunkCreator} from "../../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../../hoc/useAppSelector";




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

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,

        },
        validate,
        onSubmit: (values: LoginDataType) => {
            dispatch(loginThunkCreator(values))
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
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}

                            />
                        </div>

                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

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

                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

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

                        {props.captchaURL && <img src={props.captchaURL}/>}

                        <button type="submit">Login</button>


                    </div>
                </form>
    )
            }


//===========TYPE================

export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean

}
export type LoginErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean,
}

type LoginFormPropsType = {

    captchaURL: string | null
}