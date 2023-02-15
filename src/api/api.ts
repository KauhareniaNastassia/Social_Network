import axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "29ceddd9-9101-4a31-9b64-db4216d3334c"
    },
})

export const authAPI = {
    auth() {
        return instance.get<AuthResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
            .then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post<AuthResponseType<{ userId: number }>>('auth/login', data)
            .then(res => res.data)
    },
    logout() {
        return instance.delete<AuthResponseType>('auth/login')
            .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(profileId: number) {
        return instance.get<ProfileDataType>(`profile/${profileId}`)
            .then(res => res.data)
    },
    getStatus(profileId: number) {
        return instance.get(`profile/status/${profileId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
            .then(res => res.data)
    },
    savePhoto(photo: File) {

        const formData = new FormData()
        formData.append('image', photo)

        return instance.put(`profile/photo`, formData)
            .then(res => res.data)
    },
    saveProfile(profile: ProfileDataType) {
        return instance.put(`profile`, profile)
            .then(res => res.data)
    },
}

export const usersAPI = {
    getUsers(currentPage: number,
             pageSize: number,
             term: string,
             friend: null | boolean) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    unFollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data)
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url')
    }

}

//=============TYPES======================


//===AUTH====

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: null | string
}

export type AuthResponseType<T = {}> = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: T
}

//===PROFILE====

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


//===USERS====
export type GetUsersParamsType = {
    currentPage: number,
    pageSize: number,
    filter: {
        term: string
        friend: null | boolean
    }
}

export type FilterType = {
    term: string
    friend: null | boolean
}

export type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null,
    photos: PhotosType,
    status: string,
    followed: boolean
}

export type PhotosType = {
    small: string | null
    large: string | null
}


//=============ENUM======================

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}







