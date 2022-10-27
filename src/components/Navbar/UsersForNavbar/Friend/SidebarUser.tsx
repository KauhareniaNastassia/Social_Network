import React from "react";
import css from "./SidebarUser.module.css"


type UserPropsType = {
    photo: any
    fullName: string
}

export const SidebarUser = (props: UserPropsType) => {
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