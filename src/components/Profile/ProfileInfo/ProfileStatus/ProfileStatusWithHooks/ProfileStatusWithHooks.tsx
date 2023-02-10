import React, {ChangeEvent, Component, useEffect, useState} from 'react';

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}


export const ProfileStatusWithHooks = (props: ProfileStatusWithHooksPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(props.status)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>  {
        setInputValue(e.currentTarget.value)
    }

    const updateStatus = () => {
        setEditMode(false)
        props.updateStatus(inputValue)
    }

    useEffect( () => {
        setInputValue(props.status)
    }, [props.status] )

    return (
        <div>
            {!editMode &&
                <div>
                        <span
                            onDoubleClick={() => setEditMode(true)}>
                            {props.status || 'Tell everyone what happened!'}
                        </span>
                </div>
            }

            {editMode &&
                <div>
                    <input
                        value={inputValue}
                        onChange={onChangeInput}
                        autoFocus={true}
                        onBlur={updateStatus}
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
