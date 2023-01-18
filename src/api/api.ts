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
    }
}

export const profileAPI = {
    setProfile(userId: string) {
        return instance.get(`profile/` + userId)
            .then(res => res.data)
    }
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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



