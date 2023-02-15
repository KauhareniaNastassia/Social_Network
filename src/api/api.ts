import axios from "axios";


export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "29ceddd9-9101-4a31-9b64-db4216d3334c"
    },
})


//=============ENUM======================

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}







