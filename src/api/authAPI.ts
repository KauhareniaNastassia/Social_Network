import {instance} from "./api";


export const authAPI = {
    auth() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
            .then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
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

export type ResponseType<D = {}> = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: D
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

