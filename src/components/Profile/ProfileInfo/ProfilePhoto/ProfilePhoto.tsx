import React, {ChangeEvent, useState} from "react";
import css from "./ProfilePhoto.module.scss"

import userImg from '../../../../assets/img/profileAvatar.svg'
import {useAppDispatch, useAppSelector} from "../../../../hoc/useAppSelector";
import {savePhotoThunkCreator} from "../../../../redux/profilePageReducer";
import {ProfilePhotosResponseType} from "../../../../api/profileAPI";


export const ProfilePhoto: React.FC<ProfilePhotoPropsType> = ({
                                                                  myProfileId, photo}) => {


    const dispatch = useAppDispatch()


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(savePhotoThunkCreator(e.currentTarget.files[0]))
        }
    }


    return (
        <div className={css.profile_wrapper}>

            {myProfileId &&
                <div className={css.wrapper__changePhoto}>
                    <label htmlFor="inputTag">
                        Change
                        <input
                            id="inputTag"
                            type='file'
                            onChange={onMainPhotoSelected}
                        />
                    </label>
                </div>
            }

            <img src={photo?.large ? photo.large : userImg} className={css.userImg}/>
        </div>


    )
}


//===========TYPE================

type ProfilePhotoPropsType = {
    myProfileId: number | null,
    photo?: ProfilePhotosResponseType

}


