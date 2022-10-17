import React from "react";
import css from "./FriendFromBar.module.css"


type FriendFromBarPropsType = {
    photo: any
    friendName: string
}

export const FriendFromBar = (props: FriendFromBarPropsType) => {
    return (
            <div className={css.friendWrapper}>
               <img className={css.photo} src={props.photo}/>
                <div className={css.name}>
                    {props.friendName}
                </div>
            </div>
    )
}