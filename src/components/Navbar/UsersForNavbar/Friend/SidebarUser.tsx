import React from "react";
import css from "./SidebarUser.module.css"
import {PhotosType} from "../../../../api/usersAPI";
import defaultUserPhoto from '../../../../assets/img/profileAvatar.svg'


type UserPropsType = {
    photo: PhotosType
    fullName: string
}

export const SidebarUser = (props: UserPropsType) => {
    return (
            <div className={css.userWrapper}>
                <div></div>

               <img className={css.photo} src={props.photo.large || defaultUserPhoto}/>
                <div className={css.fullName}>
                    {props.fullName}
                </div>
            </div>
    )
}