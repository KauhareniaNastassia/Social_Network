import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hoc/useAppSelector";
import {updateStatusThunkCreator} from "../../../../redux/profilePageReducer";
import css from './ProfileStatus.module.scss'


export const ProfileStatus: React.FC<ProfileStatusPropsType> = ({isOwner}) => {

    const status = useAppSelector(state => state.profilePage.status)
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(status)
    const dispatch = useAppDispatch()

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const updateStatusHandler = () => {
        dispatch(updateStatusThunkCreator(inputValue))
        setInputValue(status)
        setEditMode(false)
    }

    useEffect(() => {
        setInputValue(status)
    }, [status])


    if(!isOwner) {
        return <div  className={css.wrapper__status}>
            <b className={css.status_unEdit_title}>Status: </b>
            <span className={css.status_unEdit}>
                            {status || 'User hasn\'t posted status yet'}
                        </span>
        </div>
    }


    return (
        <div className={css.wrapper__status}>
            <b className={css.status_unEdit_title}>Status: </b>

            {!editMode &&
                <span
                    onDoubleClick={() => setEditMode(true)}
                    className={css.status_unEdit}>
                            {status || 'Tell everyone what happened!'}
                        </span>
            }

            {editMode &&
                <input
                    value={inputValue}
                    onChange={onChangeInput}
                    autoFocus={true}
                    onBlur={updateStatusHandler}
                    className={css.status_edit}
                >
                </input>
            }
        </div>
    );
}


//===========TYPE================

type ProfileStatusPropsType = {
    isOwner:boolean
}