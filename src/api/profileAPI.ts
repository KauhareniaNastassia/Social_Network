import {instance} from "./api";
import {AxiosResponse} from "axios";
import {ResponseType} from "./authAPI";
import {PhotosType} from "./usersAPI";

export const profileAPI = {
    getProfile(profileId: number) {
        return instance.get<ProfileDataType>(`profile/${profileId}`)
            .then(res => res.data)
    },
    getStatus(profileId: number) {
        return instance.get<string>(`profile/status/${profileId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status})
            .then(res => res.data)
    },
    savePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)

        return instance.put<ResponseType<PhotosResponseType>>(`profile/photo`, formData)
            .then(res => res.data)
    },
    saveProfile(profile: ProfileDataType) {
        return instance.put<ResponseType<ProfileDataType>>(`profile`, profile)
            .then(res => res.data)
    },
}



//=============TYPES======================

export type ProfileDataType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsProfileResponseType
    photos: ProfilePhotosResponseType

}

export type ContactsProfileResponseType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfilePhotosResponseType = {
    small: string
    large: string
}

export type PhotosResponseType = {
    photos: PhotosType
}