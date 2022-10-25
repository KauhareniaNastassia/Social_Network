import React from "react";
import css from "./UserForNavbar.module.css"


type UserPropsType = {
    photo: any
    fullName: string
}

export const UserForNavbar = (props: UserPropsType) => {
    return (
            <div className={css.userWrapper}>
                <div></div>

               <img className={css.photo} src={props.photo}/>
                <div className={css.fullName}>
                    {props.fullName}
                </div>
            </div>
    )
}