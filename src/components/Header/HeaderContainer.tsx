import React, {Component} from "react";
import logo from '../../assets/img/logo.png'
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {mapDispatchToUsersPropsType, mapStateToUsersPropsType} from "../Users/UsersContainer";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserDataAC, setUserDataType} from "../../redux/authReducer";

export class HeaderAPIContainer extends Component<HeaderContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data.login
                    this.props.setAuthUserData(id, login, email)
                }
            })
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

type mapStateToHeaderPropsType = {
    isAuth: boolean
    login: null
}

type MapDispatchToHeaderPropsType = {
    setAuthUserData: (userId: null, login: null, email: null) => void
}

export type HeaderPropsType = mapStateToHeaderPropsType & MapDispatchToHeaderPropsType
export type HeaderContainerPropsType = Readonly<HeaderPropsType>

export const HeaderContainer = connect(mapStateToHeaderProps, {
    setAuthUserData: setAuthUserDataAC
})(HeaderAPIContainer)