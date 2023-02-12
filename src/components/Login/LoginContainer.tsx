import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
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
    loginThunkCreator: (data: LoginDataType, setStatus: any) => void
}

export type LoginPropsType = mapStateToLoginPropsType & MapDispatchToLoginPropsType
