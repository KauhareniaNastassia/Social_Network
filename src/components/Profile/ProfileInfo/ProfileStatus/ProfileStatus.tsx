import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../../../hoc/useAppSelector";
import {updateStatusThunkCreator} from "../../../../redux/profilePageReducer";
import css from './ProfileStatus.module.scss'


export const ProfileStatus: React.FC<ProfileStatusPropsType> = ({status}) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(status)
    const dispatch = useAppDispatch()

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const updateStatusHandler = () => {
        setEditMode(false)
        dispatch(updateStatusThunkCreator(inputValue))
    }

    useEffect(() => {
        setInputValue(status)
    }, [status])

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
    status: string
}