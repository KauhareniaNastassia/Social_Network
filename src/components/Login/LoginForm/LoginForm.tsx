import React from 'react';
import {useFormik} from 'formik';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import css from "./LoginForm.module.css"
import {loginThunkCreator} from "../../../redux/authReducer";
import {LoginPropsType} from "../LoginContainer";


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
    loginThunkCreator: (data: LoginDataType) => void
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
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
            //login: '',
        },
        validate,
        onSubmit: (values: LoginDataType) => {
            props.loginThunkCreator(values)
            /*dispatch(loginThunkCreator(values))*/
            formik.resetForm()
        },
    });

   /* if (isAuth) {
        return <Redirect to={'/profile'}/>
    }*/

    return (
        <form onSubmit={formik.handleSubmit} className={css.loginForm}>
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
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
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


            <button className={css.submitBtn} type="submit">Sign In</button>
        </form>
    );
};