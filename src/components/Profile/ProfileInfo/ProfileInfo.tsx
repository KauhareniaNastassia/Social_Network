import React from "react";
import screen from "../../../assets/img/screen.png";
import css from "./ProfileInfo.module.css"
import {PreloaderCat} from "../../../common/preloader/PreloaderCat/PreloaderCat";
import {ProfileType} from "../../../redux/profilePageReducer";
import userImg from '../../../assets/img/ava1.jpg'

type ProfileInfoPropsType = {
    profile: ProfileType | null
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <PreloaderCat/>
    }


    return (
        <div>
            <div>
                {/*<img className={css.imgScreen} src={screen}/>*/}

            </div>
            <div className={css.descriptionBlock}>
                <img src={props.profile?.photos.large ? props.profile.photos.large : userImg}/>
                <div>
                    {props.profile.fullName}
                </div>
            </div>

        </div>
    )
}