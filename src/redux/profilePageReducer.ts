import {PostType} from "./store";
import {ActionType, AppDispatchType} from "./redux-store";
import {profileAPI} from "../api/api";

let initialState: initialStateProfilePageType = {
    posts: [
        {
            id: '1',
            message: "Hi, how are you?",
            likesCount: 15
        },
        {
            id: '2',
            message: "It is my first post",
            likesCount: 5
        },
        {
            id: '3',
            message: "My dog is the best dog ever",
            likesCount: 7
        },
        {
            id: '4',
            message: "Such a beautiful squirrel",
            likesCount: 18
        },
    ] as PostType[],
    newPostText: '',
    profile: null
}

export const profilePageReducer = (state:initialStateProfilePageType = initialState, action: ActionType): initialStateProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost: PostType = {
                id: '5',
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
                newPostText: action.updatedPostText}

            return stateCopy
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}


//===========ACTIONS=========

export const addPostAC = (): AddPostActionType => {
    return {
        type: 'ADD-POST',
    }
}
export const updateNewPostTextAC = (updatedPostText: string): UpdateNewPostTextActionType => {
    return {
        type: 'UPDATE-NEW-POST-TEXT', updatedPostText
    }
}
export const setUserProfileAC = (profile: ProfileType | null): setUserProfileActionType => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    }
}


//===========ACTION TYPES=========

export type AddPostActionType = {
    type: 'ADD-POST',
    /*newPostText: string*/
}
export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    updatedPostText: string
}
export type setUserProfileActionType = {
    type: 'SET-USER-PROFILE',
    profile: ProfileType | null
}


//===========THUNK=========

export const getUserProfileThunkCreator = (userId: string) => {
    return (dispatch: AppDispatchType) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfileAC(data))
        })
    }
}

//===========TYPES=========

export type ProfilePageType = {
    posts: PostType[],
    newPostText: string,
    profile: ProfileType | null
}

type initialStateProfilePageType = ProfilePageType

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {
    small: string | null
    large: string | null
}