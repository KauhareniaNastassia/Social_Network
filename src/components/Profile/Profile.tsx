import React, {useEffect} from "react";
import {getStatusThunkCreator, getUserProfileThunkCreator} from "../../redux/profilePageReducer";
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import {useNavigate, useParams} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";


export const Profile:React.FC = () => {
    const profile = useAppSelector(state => state.profilePage.profile)
    const authorizedUserId = useAppSelector(state => state.auth.authId)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    let {userId} = useParams()


    /*useEffect( () => {
        let profileId: number | null = Number(userId)

        if (!profileId) {
            profileId = authorizedUserId
            /!*if(!userId) {
               history('/login')
            }*!/
        }

        if (!profileId) {
            console.error("ID should exist in URI parameter")
        } else {
            dispatch(getUserProfileThunkCreator(profileId))
            dispatch(getStatusThunkCreator(profileId))
        }
    }, [userId, authorizedUserId, dispatch] )*/

    useEffect( () => {
        let profileId: number | null = Number(userId)

        if (profileId) {
            dispatch(getUserProfileThunkCreator(profileId))
            dispatch(getStatusThunkCreator(profileId))
            console.log('profileId')
        } else {
            if(isAuth && authorizedUserId) {
                dispatch(getUserProfileThunkCreator(authorizedUserId))
                dispatch(getStatusThunkCreator(authorizedUserId))
                console.log('authorizedUserId')
            }
        }

    }, [userId, isAuth, authorizedUserId] )

    return (
        <div>
            <ProfileInfo
                profile={profile}
                isOwner={!userId}
            />
            <MyPosts
                isOwner={!userId}/>
        </div>
    )
}







/*

export class ProfileAPIContainer extends Component<ProfilePageClassPropsType> {

    refreshProfile() {
        let userId: number|null = this.props.match.params.userId

        if (!userId) {
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push('/login')
            }
        }

        if (!userId) {
            console.error("ID should exist in URI parameter")
        } else {
            this.props.getUserProfileTC(userId)
            this.props.getUserStatusTC(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:ProfilePageClassPropsType, prevState: ProfilePageClassPropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
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


export const Profile = compose<React.ComponentType>(
    connect(mapStateToProfileProps,
        {
            getUserProfileTC: getUserProfileThunkCreator,
            getUserStatusTC: getStatusThunkCreator,
            updateStatusTC: updateStatusThunkCreator,
            savePhotoTC: savePhotoThunkCreator,
            saveProfileTC: saveProfileThunkCreator
        }),

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
}*/

/* useEffect( () => {
      if(userId) {
          dispatch(getUserProfileThunkCreator(+userId))
          dispatch(getStatusThunkCreator(+userId))
      }

  }, [userId] )*/