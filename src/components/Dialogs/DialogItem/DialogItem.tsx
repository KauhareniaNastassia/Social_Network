import React from 'react'
import css from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    dialogId: number
}

export const DialogItem = (props: DialogItemPropsType) => {

    let path = '/dialogs/' + props.dialogId

    return (
        <div className={css.dialog}>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    )
}