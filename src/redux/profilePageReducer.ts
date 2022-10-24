import {PostType} from "./store";
import {ActionType} from "./redux-store";
import {ChangeEvent} from "react";


export type ProfilePageType = {
    posts: PostType[],
    newPostText: string
}
type initialStateProfilePageType = ProfilePageType

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
    newPostText: ''
}


export const profilePageReducer = (state:initialStateProfilePageType = initialState, action: ActionType): initialStateProfilePageType => {

    switch (action.type) {

        case "ADD-POST": {
            /*action.newPostText = state.newPostText
            const newPost: PostType = {
                id: '5',
                message: action.newPostText,
                likesCount: 5,
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state;*/

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
            /*state.newPostText = action.updatedPostText
            return state*/

            let stateCopy = {
                ...state,
                newPostText: action.updatedPostText}

            return stateCopy
        }


        default:
            return state
    }
}


export type AddPostActionType = {
    type: 'ADD-POST',
    /*newPostText: string*/
}
export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    updatedPostText: string
}


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