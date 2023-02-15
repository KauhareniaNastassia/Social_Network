import {ActionType, AppDispatchType} from "./redux-store";
import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";


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
    profile: null as ProfileType | null,
    status: ''
}

export const profilePageReducer = (state: initialStateProfilePageType = initialState, action: ActionType): initialStateProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
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
        case "UPDATE-NEW-POST-TEXT": {
            let stateCopy = {
                ...state,
                newPostText: action.updatedPostText
            }

            return stateCopy
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.postId !== action.postId)}
        }
        case 'SAVE-PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photo}as ProfileType}
        }
        default:
            return state
    }
}


//===========ACTIONS=========

export const addPostAC = (newPostText: string) => ({
    type: 'ADD-POST', newPostText
} as const)

export const updateNewPostTextAC = (updatedPostText: string) => ({
    type: 'UPDATE-NEW-POST-TEXT', updatedPostText
} as const)

export const setUserProfileAC = (profile: ProfileType | null) => ({
    type: 'SET-USER-PROFILE',
    profile
} as const)

export const setStatusAC = (status: string) => ({
    type: 'SET-STATUS',
    status
} as const)

export const deletePostAC = (postId: number) => ({
    type: 'DELETE-POST',
    postId
} as const)

export const savePhotoAC = (photo: PhotosType) => ({
    type: 'SAVE-PHOTO',
    photo
} as const)


//===========ACTION TYPES=========

export type ProfilePageActionType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoAC>


//===========THUNK=========

export const getUserProfileThunkCreator = (userId: number) =>
    async (dispatch: AppDispatchType) => {
        try {
            let res = await profileAPI.getProfile(userId)
            dispatch(setUserProfileAC(res))
        } catch (e) {

        }
    }


export const getStatusThunkCreator = (userId: number) =>
        async (dispatch: AppDispatchType) => {

            try {
                let res = await profileAPI.getStatus(userId)
                dispatch(setStatusAC(res))
            } catch (e) {

            }
        }


export const updateStatusThunkCreator = (status: string) =>
    async (dispatch: AppDispatchType) => {

        try {
            let res = await profileAPI.updateStatus(status)
            if (res.resultCode === 0) {
                dispatch(setStatusAC(res))
            }
        } catch (e) {

        }
    }


export const savePhotoThunkCreator = (file: File) =>
    async (dispatch: AppDispatchType) => {

        try {
            let res = await profileAPI.savePhoto(file)
            if (res.resultCode === 0)
                dispatch(savePhotoAC(res.data.photos))
            /*dispatch(getUserProfileThunkCreator(userId))*/
        } catch (e) {

        }

    }

export const saveProfileThunkCreator = (profile: ProfileType) =>
    async (dispatch: AppDispatchType, getState: any) => {

    const userId = getState().auth.userId

        try {
            let res = await profileAPI.saveProfile(profile)
            if (res.resultCode === 0) {
                dispatch(getUserProfileThunkCreator(userId))
            }
        } catch (e) {

        }
    }

//===========TYPES=========

export type ProfilePageType = {
    posts: PostType[],
    newPostText: string,
    profile: ProfileType | null
    status: string
}

type initialStateProfilePageType = ProfilePageType



