import React, {Component} from "react";
import {AppStateType} from "../../redux/redux-store";
import {Header} from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";

export class HeaderAPIContainer extends Component<HeaderContainerPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

export const mapStateToHeaderProps = (state: AppStateType): mapStateToHeaderPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export const HeaderContainer = connect(mapStateToHeaderProps, {
    logoutTC: logoutThunkCreator,
})(HeaderAPIContainer)

//===========TYPE================

type mapStateToHeaderPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToHeaderPropsType = {
    logoutTC: () => void
}

export type HeaderPropsType = mapStateToHeaderPropsType & MapDispatchToHeaderPropsType
export type HeaderContainerPropsType = Readonly<HeaderPropsType>