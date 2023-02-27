import React, {useEffect} from "react";
import {getStatusThunkCreator, getUserProfileThunkCreator} from "../../redux/profilePageReducer";
import {useAppDispatch, useAppSelector} from "../../hoc/useAppSelector";
import {useParams} from "react-router-dom";
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
        } else {
            if(isAuth && authorizedUserId) {
                dispatch(getUserProfileThunkCreator(authorizedUserId))
                dispatch(getStatusThunkCreator(authorizedUserId))
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
};