import React, {ChangeEvent, useEffect, useState} from 'react';


export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(status)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const updateStatusHandler = () => {
        setEditMode(false)
        updateStatus(inputValue)
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

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export type ProfileStatusClassPropsType = Readonly<ProfileStatusPropsType>

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}
