import React, {Component} from "react";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfileThunkCreator, ProfileType} from "../../redux/profilePageReducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


export class ProfileAPIContainer extends Component<ProfilePageClassPropsType>  {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '5'
        }

        this.props.getUserProfileTC(userId)
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    .then(res => {
        this.props.setUserProfile(res.data)
    })*/
        /*profileAPI.setProfile(userId).then(data => {
                this.props.setUserProfileTC(data)
            })*/
    }

    render() {

        if (!this.props.isAuth) return <Redirect to={'/login'}/>

        return (
            <Profile
                {...this.props}
                profile={this.props.profile}

            />
        )
    }
}

export const mapStateToProfileProps = (state: AppStateType): mapStateToProfilePropsType  => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

export type mapStateToProfilePropsType ={
    profile: ProfileType | null
    isAuth: boolean
}
export type mapDispatchToProfilePropsType ={
    //setUserProfile: (profile: ProfileType | null) => void
    getUserProfileTC: (userId: string) => void
}
type PathParamsType = {
    userId: string
}

export type ProfilePropsType = mapStateToProfilePropsType & mapDispatchToProfilePropsType
export type ProfilePageClassPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

let withURLDataContainerComponent = withRouter(ProfileAPIContainer)

export const ProfileContainer = connect(mapStateToProfileProps, {
    //setUserProfile: setUserProfileAC,
    getUserProfileTC: getUserProfileThunkCreator
}) (withURLDataContainerComponent)