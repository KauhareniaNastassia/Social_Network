import React, {Component} from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {mapDispatchToUsersPropsType, mapStateToUsersPropsType, UsersPageClassPropsType} from "../Users/UsersContainer";
import {Profile} from "./Profile";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ProfileType, setUserProfileAC} from "../../redux/profilePageReducer";
import state from "../../redux/state";
import {RouteComponentProps, withRouter} from "react-router-dom";



export class ProfileAPIContainer extends Component<ProfilePageClassPropsType>  {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '2'
        }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }

    render() {
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
        profile: state.profilePage.profile
    }
}

export type mapStateToProfilePropsType ={
    profile: ProfileType | null
}
export type mapDispatchToProfilePropsType ={
    setUserProfile: (profile: ProfileType | null) => void
}
type PathParamsType = {
    userId: string
}

export type ProfilePropsType = mapStateToProfilePropsType & mapDispatchToProfilePropsType
export type ProfilePageClassPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

let withURLDataContainerComponent = withRouter(ProfileAPIContainer)

export const ProfileContainer = connect(mapStateToProfileProps, {
    setUserProfile: setUserProfileAC
}) (withURLDataContainerComponent)