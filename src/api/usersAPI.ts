import {instance} from "./api";

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


//=============TYPES======================

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