import React, {Component} from "react";
import {Header} from "../Header/Header";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getAuthUserThunkCreator, initialStateAuthType, loginThunkCreator} from "../../redux/authReducer";
import {Login} from "./Login";
import {LoginDataType} from "../../api/api";



const mapStateToLoginPropsType = (state: AppStateType): mapStateToLoginPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const LoginContainer = connect(mapStateToLoginPropsType, {
    loginThunkCreator: loginThunkCreator

})(Login)

//===========TYPE================

type mapStateToLoginPropsType = {
    isAuth: boolean
}

type MapDispatchToLoginPropsType = {
    loginThunkCreator: (data: LoginDataType) => void
}

export type LoginPropsType = mapStateToLoginPropsType & MapDispatchToLoginPropsType
