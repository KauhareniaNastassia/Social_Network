import React, {Component} from "react";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../types/types";
import {ProfileDataType} from "../../api/api";


export class ProfileAPIContainer extends Component<ProfilePageClassPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = 24911
            /*profileId = this.props.authorizedUserId as number*/
            if(!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfileTC(userId)
        this.props.getUserStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate() {
        if (this.props.match.params.userId != this.props.match.params.userId)
        this.refreshProfile()
    }

    render() {
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusTC}
                savePhoto={this.props.savePhotoTC}
                saveProfile={this.props.saveProfileTC}
            />
        )
    }
}


export const mapStateToProfileProps = (state: AppStateType): mapStateToProfilePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.authId,
        isAuth: state.auth.isAuth
    }
}


export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProfileProps,
        {
            getUserProfileTC: getUserProfileThunkCreator,
            getUserStatusTC: getStatusThunkCreator,
            updateStatusTC: updateStatusThunkCreator,
            savePhotoTC: savePhotoThunkCreator,
            saveProfileTC: saveProfileThunkCreator
        }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer)


//===========TYPE================

export type ProfilePropsType = mapStateToProfilePropsType & mapDispatchToProfilePropsType
// @ts-ignore
export type ProfilePageClassPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType
export type mapStateToProfilePropsType = {
    profile: ProfileDataType | null
    status: string
    authorizedUserId:  number | null
    isAuth: boolean
    //isAuth: boolean
}
export type mapDispatchToProfilePropsType = {
    getUserProfileTC: (profileId: number) => void
    getUserStatusTC: (profileId: number) => void
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
    saveProfileTC: (formData: ProfileFormDataType) => void
}
type PathParamsType = {
    userId: number
}