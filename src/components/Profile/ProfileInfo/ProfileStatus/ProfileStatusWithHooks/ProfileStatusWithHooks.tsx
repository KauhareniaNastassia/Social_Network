import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../../../../hoc/useAppSelector";
import {updateStatusThunkCreator} from "../../../../../redux/profilePageReducer";


export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = ({status}) => {

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
        <div>
            {!editMode &&
                <div>
                    <b>Status: </b>
                    <span
                        onDoubleClick={() => setEditMode(true)}>
                            {status || 'Tell everyone what happened!'}
                        </span>
                </div>
            }

            {editMode &&
                <div>
                    <input
                        value={inputValue}
                        onChange={onChangeInput}
                        autoFocus={true}
                        onBlur={updateStatusHandler}
                    >
                    </input>
                </div>}
        </div>
    );
}


//===========TYPE================



type ProfileStatusWithHooksPropsType = {
    status: string
}
