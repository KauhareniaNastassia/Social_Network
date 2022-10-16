import React from "react";
import css from "./Post.module.css"
import ava1 from '../../../../assets/img/ava1.jpg'


type PostPropsType = {
    message: string
    likesCount: number
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={css.item}>
            <img src={ava1}/>
            {props.message}
            <div>
                <span> Like {props.likesCount} </span>
            </div>


        </div>

    )
}