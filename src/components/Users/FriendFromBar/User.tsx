import React from "react";
import css from "./User.module.css"


type UserPropsType = {
    photo: any
    userName: string
}

export const User = (props: UserPropsType) => {
    return (
            <div className={css.userWrapper}>
               <img className={css.photo} src={props.photo}/>
                <div className={css.userName}>
                    {props.userName}
                </div>
            </div>
    )
}