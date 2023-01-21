import React, {Component} from "react";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    ProfileType,
    updateStatusThunkCreator
} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


export class ProfileAPIContainer extends Component<ProfilePageClassPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '24911'
        }

        this.props.getUserProfileTC(userId)
        this.props.getUserStatusTC(userId)
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    .then(res => {
        this.props.setUserProfile(res.data)
    })*/
        /*profileAPI.setProfile(userId).then(data => {
                this.props.setUserProfileTC(data)
            })*/
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusTC}
            />
        )
    }
}


export const mapStateToProfileProps = (state: AppStateType): mapStateToProfilePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
        //isAuth: state.auth.isAuth
    }
}

/*let AuthRedirectComponent = withAuthRedirect(ProfileAPIContainer);
let withURLDataContainerComponent = withRouter(AuthRedirectComponent)

export const ProfileContainer = connect(mapStateToProfileProps, {
    //setUserProfile: setUserProfileAC,
    getUserProfileTC: getUserProfileThunkCreator
}) (withURLDataContainerComponent)*/

export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProfileProps,
        {
            getUserProfileTC: getUserProfileThunkCreator,
            getUserStatusTC: getStatusThunkCreator,
            updateStatusTC: updateStatusThunkCreator
        }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer)


//===========TYPE================

export type ProfilePropsType = mapStateToProfilePropsType & mapDispatchToProfilePropsType
export type ProfilePageClassPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType
export type mapStateToProfilePropsType = {
    profile: ProfileType | null
    status: string
    //isAuth: boolean
}
export type mapDispatchToProfilePropsType = {
    //setUserProfile: (profile: ProfileType | null) => void
    getUserProfileTC: (userId: string) => void
    getUserStatusTC: (status: string) => void
    updateStatusTC: (status: string) => void
}
type PathParamsType = {
    userId: string
}