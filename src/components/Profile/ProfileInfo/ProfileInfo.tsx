import React from "react";
import css from "./ProfileInfo.module.css"
import {PreloaderCat} from "../../../common/preloader/PreloaderCat/PreloaderCat";
import {ProfileType} from "../../../redux/profilePageReducer";
import userImg from '../../../assets/img/ava1.jpg'
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
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
                <img src={props.profile?.photos.large ? props.profile.photos.large : userImg} className={css.userImg}/>
                <div>
                    {props.profile.fullName}
                </div>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>

        </div>
    )
}




/*
import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import defaultAvatar from './../../../assets/images/cat_ava.jpg'
import ProfileStatus from "./ProfileStatus";

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <PreloaderCat/>
    }

    const onProfilePhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>

            <div >
                <img
                    src={props.profile?.photos.large ? props.profile.photos.large : userImg }
                    alt={`user avatar ${props.profile.userId}`}
                    className={css.userImg}
                    style={{borderRadius: 80, width: 150}}
                    onDoubleClick={() =>{setEditMode(true)} }
                />
                { editMode === true && props.profile.userId === 22856
                    ? <div><input type="file"  onChange={onProfilePhotoSelected} onClick={() => setEditMode(false)} /></div>
                    : null
                }

                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>
                    {props.profile.fullName}
                </div>
                <div className={classes.descriptionBlock}>
                    Name: {props.profile.fullName} <br/>
                    About: {props.profile.aboutMe} <br/>
                    Contacts:

                    facebook: {props.profile.contacts.facebook} <br/>
                    website: {props.profile.contacts.website} <br/>
                    VK: {props.profile.contacts.vk} <br/>
                    twitter: {props.profile.contacts.twitter} <br/>
                    instagram: {props.profile.contacts.instagram} <br/>
                    youtube: {props.profile.contacts.youtube} <br/>
                    github: {props.profile.contacts.github} <br/>
                    mainLink: {props.profile.contacts.mainLink} <br/><br/>
                    Looking for a job: {props.profile.lookingForAJob === true
                    ? props.profile.lookingForAJobDescription
                    : "Yes, i want work in IntexSoft"} <br/>
                    <br/>


                </div>
            </div>
        </div>
    );
};

*/
