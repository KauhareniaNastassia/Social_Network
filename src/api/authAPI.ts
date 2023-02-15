import {instance, ResultCodeEnum} from "./api";


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

//=============TYPES======================

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