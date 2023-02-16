import {instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaURLResponseType>('/security/get-captcha-url')
            .then(res => res.data)
    }
}


//===========TYPES=============

export type GetCaptchaURLResponseType = {
    url: string
}