//==============PROFILE PAGE TYPES ====================

export type PostType = {
    postId: number,
    message: string
    likesCount: number
}

export type ProfileType = {
    aboutMe: string
    profileId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

//==============USER PAGE TYPES ====================

export type UserType = {
    id: number
    followed: number,
    photos: PhotosType
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}