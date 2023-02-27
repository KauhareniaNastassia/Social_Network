import {ActionType, AppDispatchType, AppThunkType, InferActionsTypes} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersPageActions} from "./usersPageReducer";
import {profileAPI, ProfileDataType, UpdateProfileType} from "../api/profileAPI";
import {ResultCodeEnum} from "../api/authAPI";
import {appActions} from "./appReducer";
import {handleServerNetworkError} from "../utils/errorHandler";


let initialState: initialStateProfilePageType = {
    posts: [
        {
            postId: 1,
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare massa ac quam fermentum, et scelerisque leo fermentum. Curabitur sed eleifend risus. Curabitur vehicula ex lectus, nec sagittis nulla faucibus et. Pellentesque accumsan ex eu finibus cursus. Sed pellentesque ligula enim, quis tincidunt quam bibendum vitae. Cras eu mi at arcu vestibulum hendrerit. Aenean vel enim ut risus volutpat pulvinar eget nec dui. In neque dolor, egestas nec felis eu, posuere ornare mauris. Nullam dapibus tincidunt nunc, at accumsan mi rutrum ut. Etiam lacinia ornare consequat. Cras luctus ante ac nibh scelerisque, quis cursus ex euismod. ",
            likesCount: 15
        },
        {
            postId: 2,
            message: "Phasellus condimentum, dui molestie hendrerit tempor, elit sapien tincidunt libero, at congue lorem magna in massa. Aenean erat diam, interdum sed nisi et, molestie interdum nulla. Duis quis lacus risus. Aenean at elit rutrum augue egestas feugiat tincidunt eu lorem. Ut felis urna, vehicula consectetur dapibus et, ornare ut eros. Suspendisse suscipit varius felis. Pellentesque suscipit blandit metus at vestibulum. Donec cursus dignissim dignissim. Suspendisse tempor enim in malesuada pharetra. Phasellus blandit velit imperdiet accumsan scelerisque. Etiam elementum luctus ligula pellentesque varius. Morbi quis euismod ligula, ullamcorper volutpat risus. Aenean eu nulla posuere erat feugiat placerat.",
            likesCount: 5
        },
        {
            postId: 3,
            message: "Quisque enim turpis, cursus in dictum id, commodo in mi. Nullam non semper neque. Nam ut erat sit amet lorem mattis aliquam nec et magna. Cras eget ante non tellus gravida dignissim. Etiam convallis interdum elit. Integer id tristique urna. Vivamus sit amet dui in orci ullamcorper porttitor quis sit amet erat. In leo lorem, congue ut tristique ac, interdum vel dui.",
            likesCount: 7
        },
        {
            postId: 4,
            message: "Sed non aliquet ex, sit amet faucibus tellus. Sed nisi dui, congue facilisis sodales at, dignissim eu risus. Ut bibendum, justo et dignissim interdum, nulla est eleifend neque, elementum luctus ligula tortor non tortor. Morbi ac magna rutrum, condimentum quam in, varius dolor. Morbi a placerat quam. Donec vitae dapibus tortor. Morbi egestas, tortor ac maximus condimentum, tellus augue dignissim nibh, eu rutrum lectus sapien nec metus. Vestibulum vitae tortor leo. Aliquam porttitor egestas lobortis. Phasellus euismod sem eu elit faucibus aliquet.",
            likesCount: 18
        },
    ] as PostType[],
    newPostText: '',
    profile: {} as ProfileDataType,
    status: ''
}

export const profilePageReducer = (state: initialStateProfilePageType = initialState, action: ActionType): initialStateProfilePageType => {
    switch (action.type) {
        case "profile/ADD-POST": {
            const newPost: PostType = {
                postId: 5,
                message: state.newPostText,
                likesCount: 0,
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
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileDataType}
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

    setUserProfileAC: (profile: ProfileDataType) => ({
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

export const getUserProfileThunkCreator = (profileId: number): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            const res = await profileAPI.getProfile(profileId)
            dispatch(profilePageActions.setUserProfileAC(res))
            console.log('getUserProfileThunkCreator', res)
            dispatch(appActions.setAppStatusAC('idle'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }


export const getStatusThunkCreator = (profileId: number): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            let res = await profileAPI.getStatus(profileId)
            dispatch(profilePageActions.setStatusAC(res))
            dispatch(appActions.setAppStatusAC('idle'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }


export const updateStatusThunkCreator = (status: string): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            let res = await profileAPI.updateStatus(status)
            if (res.resultCode === 0) {
                dispatch(profilePageActions.setStatusAC(status))
                dispatch(appActions.setAppStatusAC('idle'))
                dispatch(appActions.setAppSuccessMessageAC('Status has been successfully changed'))
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }


export const savePhotoThunkCreator = (file: File): AppThunkType =>
    async (dispatch) => {
        dispatch(appActions.setAppStatusAC('loading'))
        try {
            let res = await profileAPI.savePhoto(file)
            if (res.resultCode === 0) {
                dispatch(profilePageActions.savePhotoAC(res.data.photos))
                dispatch(appActions.setAppStatusAC('idle'))
                dispatch(appActions.setAppSuccessMessageAC('Photo has been successfully changed'))
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }

    }

export const saveProfileThunkCreator = (profile: UpdateProfileType): AppThunkType =>
    async (dispatch, getState) => {
        dispatch(appActions.setAppStatusAC('loading'))
        const profileId = getState().auth.authId
        try {
            let res = await profileAPI.saveProfile(profile)
            console.log(res)
            if (res.resultCode === 0 && profileId) {
                dispatch(getUserProfileThunkCreator(profileId))
                dispatch(appActions.setAppSuccessMessageAC('Profile info has been successfully changed'))
            }
        } catch (e) {
            dispatch(appActions.setAppStatusAC('idle'))
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



