import React, {Component} from "react";
import {AppStateType} from "../../redux/redux-store";
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export class HeaderAPIContainer extends Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserTC()
    }

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
    getAuthUserTC: getAuthUserThunkCreator
})(HeaderAPIContainer)

//===========TYPE================

type mapStateToHeaderPropsType = {
    isAuth: boolean
    login: null
}

type MapDispatchToHeaderPropsType = {
    logoutTC: () => void
    getAuthUserTC: () => void
}

export type HeaderPropsType = mapStateToHeaderPropsType & MapDispatchToHeaderPropsType
export type HeaderContainerPropsType = Readonly<HeaderPropsType>