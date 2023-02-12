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
        return instance.get(`auth/me`)
            .then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post('auth/login', data)
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
            .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
            .then(res => res.data)
    },
    savePhoto(photo: File) {

        const formData = new FormData()
        formData.append('image', photo )

        return instance.put(`profile/photo`, formData, /*{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }*/)
            .then(res => res.data)
    }
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean ) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    unFollowUser(userId: string) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data)
    },
    followUser(userId: string) {
        return instance.post(`follow/${userId}`)
            .then(res => res.data)
    }
}

//=============TYPES======================

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}







