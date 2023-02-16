import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersPageActions} from "./usersPageReducer";
import {profileAPI, ProfileDataType} from "../api/profileAPI";


let initialState: initialStateProfilePageType = {
    posts: [
        {
            postId: 1,
            message: "Hi, how are you?",
            likesCount: 15
        },
        {
            postId: 2,
            message: "It is my first post",
            likesCount: 5
        },
        {
            postId: 3,
            message: "My dog is the best dog ever",
            likesCount: 7
        },
        {
            postId: 4,
            message: "Such a beautiful squirrel",
            likesCount: 18
        },
    ] as PostType[],
    newPostText: '',
    profile: null as ProfileDataType | null,
    status: ''
}

export const profilePageReducer = (state: initialStateProfilePageType = initialState, action: ActionType): initialStateProfilePageType => {
    switch (action.type) {
        case "profile/ADD-POST": {
            const newPost: PostType = {
                postId: 5,
                message: state.newPostText,
                likesCount: 5,
            }
            let stateCopy = {
                ...state,
                posts: [newPost, ...state.posts],
                newPostText: ''
            }

            return stateCopy;
        }
        case "profile/UPDATE-NEW-POST-TEXT": {
            let stateCopy = {
                ...state,
                newPostText: action.updatedPostText
            }

            return stateCopy
        }
        case 'profile/SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profile/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'profile/DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.postId !== action.postId)}
        }
        case 'profile/SAVE-PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photo}as ProfileDataType}
        }
        default:
            return state
    }
}


//===========ACTIONS=========

export const profilePageActions = {

    addPostAC: (newPostText: string) => ({
        type: 'profile/ADD-POST', newPostText
    } as const),

    updateNewPostTextAC: (updatedPostText: string) => ({
        type: 'profile/UPDATE-NEW-POST-TEXT', updatedPostText
    } as const),

    setUserProfileAC: (profile: ProfileDataType | null) => ({
        type: 'profile/SET-USER-PROFILE',
        profile
    } as const),

    setStatusAC: (status: string) => ({
        type: 'profile/SET-STATUS',
        status
    } as const),

    deletePostAC: (postId: number) => ({
        type: 'profile/DELETE-POST',
        postId
    } as const),

    savePhotoAC: (photo: PhotosType) => ({
        type: 'profile/SAVE-PHOTO',
        photo
    } as const),

}



//===========ACTION TYPES=========

export type ProfilePageActionType = InferActionsTypes<typeof profilePageActions>

//===========THUNK=========

export const getUserProfileThunkCreator = (profileId: number | null): AppThunkType =>
    async (dispatch) => {
        try {
            if(profileId) {
                let res = await profileAPI.getProfile(profileId)
                dispatch(profilePageActions.setUserProfileAC(res))
            }

        } catch (e) {

        }
    }


export const getStatusThunkCreator = (profileId: number): AppThunkType =>
        async (dispatch) => {

            try {
                let res = await profileAPI.getStatus(profileId)
                dispatch(profilePageActions.setStatusAC(res))
            } catch (e) {

            }
        }


export const updateStatusThunkCreator = (status: string): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await profileAPI.updateStatus(status)
            if (res.resultCode === 0) {
                dispatch(profilePageActions.setStatusAC(status))
            }
        } catch (e) {

        }
    }


export const savePhotoThunkCreator = (file: File): AppThunkType =>
    async (dispatch) => {

        try {
            let res = await profileAPI.savePhoto(file)
            if (res.resultCode === 0)
                dispatch(profilePageActions.savePhotoAC(res.data.photos))
            /*dispatch(getUserProfileThunkCreator(userId))*/
        } catch (e) {

        }

    }

export const saveProfileThunkCreator = (profile: ProfileDataType): AppThunkType =>
    async (dispatch, getState) => {

    const profileId = getState().auth.authId

        try {
            let res = await profileAPI.saveProfile(profile)
            if (res.resultCode === 0) {
                dispatch(getUserProfileThunkCreator(profileId))
            }
        } catch (e) {

        }
    }

//===========TYPES=========

export type ProfilePageType = {
    posts: PostType[],
    newPostText: string,
    profile: ProfileDataType | null
    status: string
}

type initialStateProfilePageType = ProfilePageType



