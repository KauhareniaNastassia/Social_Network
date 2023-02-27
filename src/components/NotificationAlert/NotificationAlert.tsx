import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import {Alert} from "antd";
import css from './NotificationAlert.module.scss'
import {appActions} from "../../redux/appReducer";

export const NotificationAlert = () => {

    const errorMessage = useAppSelector(state => state.app.error)
    const successMessage = useAppSelector(state => state.app.successMessage)
    const dispatch = useAppDispatch()
    const [alertOpen, setAlertOpen] = useState(false)

    const onClickHandleClose = () => {

        setAlertOpen(false)
        dispatch(appActions.setAppSuccessMessageAC(null))
        dispatch(appActions.setAppErrorAC(null))

    }

    useEffect(() => {
        const timer = setInterval(() => {
            onClickHandleClose()
        }, 5000);

        return () => clearInterval(timer);
    });


    return (
        <div className={css.wrapper_alert}>
            {errorMessage &&
                <Alert
                    message={errorMessage}
                    onClose={onClickHandleClose}
                    type="error"
                    closable={true}
                    className={css.wrapper_alert_error}
                >{errorMessage}</Alert>}

            {successMessage &&
                <Alert
                    message={successMessage}
                    className={css.wrapper_alert_success}
                    onClose={onClickHandleClose}
                    type="info"
                    closable={true}
                >
                </Alert>
            }
        </div>
    );
};

